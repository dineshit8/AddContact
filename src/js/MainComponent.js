import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ConRenderViewContactComponent } from './ViewContact';
import {ConRenderFormComponent} from './FormComponent'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { store } from '../Redux/store'

export default class RenderMainComponent extends Component
{
  constructor(props)
  {
    super(props)
    this.handlePlusIconClick = this.handlePlusIconClick.bind(this);
    this.handleViewContact = this.handleViewContact.bind(this);
    this.handleEditAction = this.handleEditAction.bind(this);
  }
  handlePlusIconClick(size)
  {
    this.props.increment(size)
  }
  handleEditAction(e)
  {
    let targetDom = e.target;
    let id = targetDom.getAttribute('data-id');
    console.log(store);
    let children = this.props.storeValue && this.props.storeValue.children ? this.props.storeValue.children : "";
    let prefilledValue = children.filter(function(value)
    {
      return value.id === id;
    })
    ReactDOM.render(
      <Provider store={store}>
          <ConRenderFormComponent dataValue = {prefilledValue} id = {id} flag = "edit" title = "Edit Contact Details"/>
      </Provider>, 
      document.getElementById('form')
    ) 
  document.getElementById('form').style.display = "inline-block";
  }
  handleViewContact(e)
  {
    let targetDom = e.target;
    let id = targetDom.getAttribute('id');
    ReactDOM.render(
      <Provider store={store}>
          <ConRenderViewContactComponent targetContactId = {id} />
      </Provider>, 
      document.getElementById('rightContainer')
    ) 
  }
  render()
  {
    let thisObj = this;
    let contactArrObj = thisObj.props.storeValues;
    console.log(contactArrObj)
    return(
        contactArrObj && contactArrObj.children ? contactArrObj.children.map(function(value , index)
        {
          return (
            <div className = "contactListCont" key= {index}>
                {value.name ? 
                <>
                  <div title = "Click to View More" id = {value.id ? value.id : ""} className = "verticalAlign nameLogo" onClick = {thisObj.handleViewContact}><span id = {value.id ? value.id : ""}>{value.name.slice(0,2)}</span></div>
                  <div className = "verticalAlign name" title = {value.name}><span>{value.name}</span>
                    {value.email ? <div className ="mail" title = {value.email}>{value.email}</div> : ""}
                  </div>
                </>: ""}
                {value.company ? <div className = "verticalAlign company" title = {value.company}>{value.company}</div> : ""}
                {value.id ? <div onClick = {thisObj.handleEditAction} className = "editIcon" data-id= {value.id} title = {value.id}></div>:""}
            </div>
          )
        })
        :""
    )
  }
}

const mapStateToProps = (state, props) => {
  return({
        storeValue: state.contactArr
      })
}

const Connector = connect(mapStateToProps)
const ConRenderMainComponent = Connector(RenderMainComponent)

export {
  ConRenderMainComponent
}
