import { Button, Checkbox, Form } from 'semantic-ui-react';

//Used semantic UI to create this form
//possible addition is list of usernames created

const MainSignup = () => {
    return (  
        <div className="edit">
            <Form>
                <Form.Field>
                <label>New Username</label>
                <input placeholder='New username' />
                </Form.Field>
                <Form.Field>
                <label>Password</label>
                <input placeholder='Password for the user' />
                </Form.Field>
                <Form.Field>
                <Checkbox label='I want to create this user' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </div>
    );
}
 
export default MainSignup;