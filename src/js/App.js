import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { ConRenderMainComponent } from './MainComponent';
import { ConRenderFormComponent } from './FormComponent';
import { Provider } from 'react-redux'
import { store } from '../Redux/store'
import '../scss/App.scss';

export default class Wrapper extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {title : "Contacts"};
    this.handleAddButton = this.handleAddButton.bind(this);
  }
  handleAddButton(e)
  {
      ReactDOM.render(
        <Provider store={store}>
            <ConRenderFormComponent title = "Add Contact Details"/>
        </Provider>, 
        document.getElementById('form')
      ) 
    document.getElementById('form').style.display = "inline-block";
  }
  render()
  {
    console.log(this.state.storeValue);
    return(
      <div className = "wrapper">
        <div className = "bodyContainer">
            <div className = "leftContainer">
                <div className ="header">
                  <div className = "headerTitle" title = {this.state.title} aria-label = {this.state.title}>{this.state.title}</div>
                </div>
                <div className = "addContainer">
                  <div className = "addBtnCont btn" onClick = {this.handleAddButton}>
                      <div className = "addbutton" aria-label = "Add Contact" role = "button" title = "Add Contact Button">Add Contact</div>
                  </div>
                </div>
                <div className = "listContainer">
                  <ConRenderMainComponent storeValues = {this.props.storeValue}/>
                </div>
            </div>
            <div id = "rightContainer" className = "rightContainer">
            </div>
          </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
return({
      storeValue: state.contactArr
    })
}

const Connector = connect(mapStateToProps)
const ConWrapper = Connector(Wrapper)

export {
  ConWrapper
}
