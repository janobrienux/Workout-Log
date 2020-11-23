import React, {useState} from 'react';
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';

const WorkoutEdit = (props) => {
  const [editDesc, setEditDesc] = useState(props.workoutToUpdate.scription);
  const [editDef, setEditDef] = useState(props.workoutToUpdate.definition);
  const [editRes, setEditRes] = useState(props.workoutToUpdate.results);
  const workoutUpdate = (event, workout) => {
    event.preventDefault();
    fetch(`http://localhost:3005/log/${props.workoutUpdate.id}`, {
      method: 'PUT',
      body: JSON.stringify({log: {description: editDesc, definition: editDef, result: editRes}}),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': props.token
      })
    }).then(() => {
      props.fetchWorkouts();
      props.updateOff();
    })
  }
  return(
    <Modal isOpen={true}>
      <ModalHeader>Log a Workout</ModalHeader>
      <ModalBody>
        <Form onSubmit={workoutUpdate}>
          <FormGroup>
            <Label htmlFor="result">Edit Result:</Label>
            <Input name="result" value={editRes} onChnage={(e) => setEditRes(e.target.value)}/>
          </FormGroup>
          <FormGroup>
          <Label htmlFor="definition">Edit Definition:</Label>
            <Input type="select" name="definition" value={editDef} onChnage={(e) => setEditRes(e.target.value)}/>
            <option></option>
            <option value="Time">Time</option>
            <option value="Weight">Weight</option>
            <option value="Distance">Distance</option>

          </FormGroup>
          <Button type="submit">Update the workout!</Button>
        </Form>
      </ModalBody>
    </Modal>
  )
}