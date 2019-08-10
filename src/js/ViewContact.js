
import React, { Component } from 'react'
import { connect } from 'react-redux'

export class ViewContact extends Component {
    render() {
        let thisObj = this;
        let contactArrObj = thisObj.props.storeValue;
        console.log(thisObj.props);
        return(
           <div className = "viewContact">
               <div className = "tableCont">
                    { 
                        contactArrObj && contactArrObj.children ? contactArrObj.children.map(function(value , index)
                        {
                            if(value.id === thisObj.props.targetContactId)
                            {
                                return(
                                    <>
                                        <div className = "logoContainer">
                                            <div key = {"logo" + index} title = "Click to View More" className = "verticalAlign nameLogo"><span>{value.name.slice(0,2)}</span></div>
                                        </div>
                                        <div className = "valuetable" key = {index} >
                                            <div className = "table-list">
                                                <span className = "label">FullName</span><span className="value">{value.name}</span>
                                            </div>
                                            <div className = "table-list">
                                                <span className = "label">Email</span><span className="value">{value.email}</span>
                                            </div>
                                            <div className = "table-list">
                                                <span className = "label">Phone</span><span className="value">{value.phno}</span>
                                            </div>
                                            <div className = "table-list">
                                            <span className = "label">Company</span><span className="value">{value.company}</span>
                                            </div>
                                            <div className = "table-list">
                                                <span className = "label">Address</span><span className="value">{value.address}</span>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        }):""
                    }
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
  const ConRenderViewContactComponent = Connector(ViewContact)
  
  export {
    ConRenderViewContactComponent
  }
  