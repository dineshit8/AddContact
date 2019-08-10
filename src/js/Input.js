
import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {alert: false ,value : this.props.value ? this.props.value : "", id : this.props.id};
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnBlur = this.handleOnBlur.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
    handleOnChange(e){
        this.setState({value:e.target.value});
    }
    handleKeyPress(e){
        if (e.target.type === "number"){
            if(e.charCode === 101 || e.charCode === 69) {
                e.preventDefault();
            }
            let maxLength = e.target.getAttribute("maxlength");
            if( maxLength && (e.target.value.length === parseInt(e.target.getAttribute("maxlength")))){
                e.preventDefault();
            }
        }
    }
    handleOnBlur(e){
        let inputElem = e.target;
        let inputValue = inputElem.value && inputElem.value.trim(); //RMT-14
        let idValue =  inputElem.getAttribute("id");
        if(inputValue === "") {
            this.setState({alert : true});
            document.getElementById('alert').style.display = "block";
        }
        else{
            if(idValue === "email")
            {
                if((/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/).test(inputValue)){
                    this.setState({alert: false });
                    if(document.getElementsByClassName('redAlert').length === 0)
                    {
                        document.getElementById('alert').style.display = "none";
                    }
                }
                else{
                    this.setState({alert : true});
                    document.getElementById('alert').style.display = "block";
                    return false;
                }
            }
            else{
                this.setState({alert: false });
                if(document.getElementsByClassName('redAlert').length === 0)
                {
                    document.getElementById('alert').style.display = "none";
                }
            }
            let valueObj = {"id": idValue, "value": inputValue}
            this.props.cbk && this.props.cbk(valueObj);
        }
    }
    componentWillReceiveProps(newProps , prevstate) {
        this.setState({id: newProps && newProps.id ? newProps.id : "" , value : newProps.value ? newProps.value : ""})
    }
    render() {
        return(
            <input 
                id = {this.state.id ? this.state.id : ""} 
                className = {this.state.alert ? "redAlert inputBox" : "inputBox"}
                placeholder = {"Enter Your" +" "+ this.state.id}
                type = {(this.state.id ==="email") ? "email" : (this.state.id === "phno") ? "tel" : "text"}
                onChange={this.handleOnChange}
                onBlur={this.handleOnBlur}
                value = {this.state.value}
                minLength = {(this.state.id ==="email") ? "15" : (this.state.id === "phno") ? "10" : "3"} 
                maxLength = "50"
            />
        )
    }
}

const mapStateToProps = (state, props) => {
    return({
          storeValue: state.contactArr
        })
  }

  const Connector = connect(mapStateToProps)
  const ConRenderInputComponent = Connector(Input)
  
  export {
    ConRenderInputComponent
  }
  