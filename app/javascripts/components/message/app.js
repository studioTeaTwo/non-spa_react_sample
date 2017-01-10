import React from 'react';
import ReactDOM from 'react-dom';
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';

require('es6-promise').polyfill();

const TAB_TYPE = [
        'world',
        'guild'
      ];

class MessageApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleTabSelect = this.handleTabSelect.bind(this);
    this.state = {
      activeTab: 'world'
    };
  }

  handleTabSelect(value) {
    this.setState({
      activeTab: value
    });
  }

  render() {
    return (
      <div className="message-container">
        <h1 className="message-title">メッセージ</h1>
        <div className="message-header">
          <p className="headline">メッセージを表示します。</p>
        </div>
        <Tab.Container defaultActiveKey={TAB_TYPE[0]} onSelect={this.handleTabSelect} className="message-nav">
          <Row className="clearfix">
            <Col sm={12}>
              <Nav bsStyle="tabs">
                <NavItem eventKey={TAB_TYPE[0]}>
                  {TAB_TYPE[0]}
                </NavItem>
                <NavItem eventKey={TAB_TYPE[1]}>
                  {TAB_TYPE[1]}
                </NavItem>
              </Nav>
            </Col>
            <Col sm={12}>
              <Tab.Content animation className="message-main">
                <Tab.Pane eventKey={this.state.activeTab}>
                  <p>{this.state.activeTab}のメッセージ</p>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    );
  }
}

ReactDOM.render(
  <MessageApp />,
  document.getElementById('content')
);