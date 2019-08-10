import React, { Component } from 'react'
import { connect } from 'react-redux';
import {ConRenderInputComponent} from './Input';
import {addContact , editContact} from '../Redux/action';

export default class RenderFormComponent extends Component
{
    constructor(props)
    {
      super(props);
      this.state = {fieldvalues: {} , value : this.props.dataValue ? this.props.dataValue : []};
      this.handleInputValues = this.handleInputValues.bind(this);
      this.handleSubmitAction = this.handleSubmitAction.bind(this);
      this.handleCancelAction = this.handleCancelAction.bind(this);
    }
    handleInputValues(values) {
        let id = values.id;
        this.state.fieldvalues[id] = values.value;
    }
    handleSubmitAction(event){
        event.preventDefault();
        if(document.getElementsByClassName('redAlert').length == 0)
        {
            if(typeof(this.props.flag) !== "undefined" && this.props.flag === "edit")
            {             
                this.state.fieldvalues["id"] = this.props.id;
                this.props.editContact(this.state.fieldvalues); 
                this.setState({fieldvalues : {}});
                document.getElementById('form').style.display = "none";
            }
            else
            {
                this.props.addContact(this.state.fieldvalues);  
                this.setState({fieldvalues : {}});
                document.getElementById('form').style.display = "none"; 
            }
        }
    }
    handleCancelAction(event){
        document.getElementById('form').style.display = "none";
    }
    componentWillReceiveProps(newprops)
    {
        this.setState({ value : newprops.dataValue ? newprops.dataValue : []})
    }
    render()
    {
        let thisObj = this;
        var prefilledValue = typeof(this.state.value) !== "undefined" && this.state.value && this.state.value.length ? this.state.value[0] : [];
        console.log("fdfdsfdfae"+this.state.value);
        return(
            <div className = "formContentWrapper">
                <form id="contactForm" className = "formContainer">
                    <div className = "form-header">
                        <div className = "title" title = {this.state.title} >{this.props.title}</div>
                    </div>
                    <div id = "alert">Please Resolve the Errors Below</div>
                    <div className = "formInnerCon">
                        <div className = "formElem">
                            <div className = "form-nameCont">
                                <ConRenderInputComponent id = "name" value = {prefilledValue["name"] ? prefilledValue["name"] : ""} cbk={thisObj.handleInputValues}/>
                            </div>
                            <div id = "test" className = "form-mailCont">
                                <ConRenderInputComponent id = "email" value = {prefilledValue["email"] ? prefilledValue["email"] : ""} cbk={thisObj.handleInputValues}/>
                            </div>
                            <div className = "form-phnoCont">
                                <ConRenderInputComponent id = "phno" value = {prefilledValue["phno"] !== "undefined" ? prefilledValue["phno"]: ""} cbk={thisObj.handleInputValues}/>
                            </div>
                            <div className = "form-companyCont">
                                <ConRenderInputComponent id = "company" value = {prefilledValue["company"] !== "undefined" ? prefilledValue["company"] : ""} cbk={thisObj.handleInputValues}/>
                            </div>
                            <div className = "form-addressCont">
                                <ConRenderInputComponent id = "address" value = {prefilledValue["address"] !=="undefined" ? prefilledValue["address"] : ""} cbk={thisObj.handleInputValues}/>
                            </div>
                            <div className = "btn_cont">
                                <div className="submit_cont">
                                    <button type="submit" className ="btn" onClick={this.handleSubmitAction}>Submit</button>
                                </div>
                                <div className="reset_cont">
                                    <button className="btn" type="reset" onClick = {this.handleCancelAction}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
const mapStateToProps = (state, props) => {
    return({
          storeValue: state.contactArr
        })
  }
  
  const mapActionToProps = (dispatch, props) => (
  {
    addContact: addContact,
    editContact : editContact
  })
  
  const Connector = connect(mapStateToProps, mapActionToProps)
  const ConRenderFormComponent = Connector(RenderFormComponent)
  
  export {
    ConRenderFormComponent
  }
  