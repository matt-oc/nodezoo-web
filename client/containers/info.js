'use strict'

import React from 'react'
import {connect} from 'react-redux'
import {getInfo} from '../actions/info'
import {GitInfo} from '../components/git-info'
import {NpmInfo} from '../components/npm-info'
import {TravisInfo} from '../components/travis-info'

export const Info = React.createClass({
  propTypes: {
    dispatch: React.PropTypes.func.isRequired
  },

  componentDidMount () {
    const dispatch = this.props.dispatch
    const moduleName = this.props.params.moduleName

    dispatch(getInfo(moduleName))
  },

  shouldComponentUpdate () {
    return !this.props.result
  },

  render () {
    const moduleName = this.props.params.moduleName
    let body = null

    if (this.props.result) {
      const {no_github, github, no_npm, npm, no_travis, travis} = this.props.result

      body = (
        <div className="panel panel-module-info txt-left">
          {(() => {
            if (!no_npm) {
              return <NpmInfo npm={npm} />
            }
          })()}

          {(() => {
            if (!no_github) {
              return <GitInfo github={github} />
            }
          })()}

          {(() => {
            if (!no_travis) {
              return <TravisInfo travis={travis} />
            }
          })()}
        </div>
      )

      if (no_github || no_npm || no_travis) {
        setTimeout(() => {
          this.props.dispatch(getInfo(moduleName))
        }, 3000)
      }
    }

    return (
      <div className="info">
        <div className="row center-xs">
          <div className="col-xs-12 col-sm-8 col-md-8 col-rg-6">
            <div className="module-header cf">
              <div className="row middle-xs">
                <h1 className="col-xs-12 col-sm-7 m0">{moduleName}</h1>
                <a href="/" className="col-xs-12 col-sm-5">← Back to search results</a>
              </div>
            </div>
            {body}
          </div>
        </div>
      </div>
    )
  }
})

function mapStatesToProps (state) {
  return {
    result: state.info.result
  }
}

export default connect(mapStatesToProps)(Info)
