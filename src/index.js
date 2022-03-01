import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Container, ListGroup } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Label htmlFor="todoText">¿Qué se necesita hacer?</Form.Label>
          <Form.Control 
            type="text" 
            id="todoText"  
            onChange={this.handleChange}
            value={this.state.text}
          />
          <Button variant="primary" type="submit">
            Añadir #{this.state.items.length + 1}
          </Button>
        </Form>
        <h3>Tareas pendientes</h3>
        <TodoList items={this.state.items} />
      </Container>

    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });   
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ListGroup variant="flush">
      {this.props.items.map(item => (
        <ListGroup.Item key={item.id}>{item.text}</ListGroup.Item>
      ))}
    </ListGroup>

    );
  }
}

ReactDOM.render(
  <TodoApp />,
  document.getElementById('root')
);