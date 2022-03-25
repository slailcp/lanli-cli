import React from 'react';
import IconArrowLeft from "../icons/ArrowLeft"
import "./index.less"
export function NavBar(props: any) {
  return (
    <div className="lan-navbar-wraper">
      <div className="lan-navbar-item" onClick={() => { props.onBack() }}>
        <IconArrowLeft />
      </div>
      <div className="lan-navbar-center">{props.children}</div>
      <div className="lan-navbar-item"></div>
    </div>
  )
}