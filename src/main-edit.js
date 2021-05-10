import { Button, Form, Message , Dropdown} from 'semantic-ui-react'

//Used semantic UI to create this form
//The value right below are the options for dropdown 
//options semantic UI
//possible addition is of input logs below this form
const categoryOptions = [
    {
      key: 'Dairy',
      text: 'Dairy',
      value: 'Dairy',
    },
    {
      key: 'Electronic',
      text: 'Electronic',
      value: 'Electronic',
    },
  {
      key: 'Fruits',
      text: 'Fruits',
      value: 'Fruits',
    },
]

const MainEdit = () => {
    return ( 
        <div className="edit">
            <Form error>
                <Form.Input label='Item' placeholder='Laptop' />
                <Form.Input label='Quantity' placeholder='3' />
                <Form.Input label='Category' placeholder='Electronics'>
                <Dropdown
                        placeholder='Category'
                        fluid
                        selection
                        options={categoryOptions}
                />
                </Form.Input>
                <Form.Input label='Location' placeholder='Location' />
                {/* <Message
                error
                header='Action Forbidden'
                content='You can only sign up for an account once with a given e-mail address.'
                /> */}
                <Button>Submit</Button>
            </Form>

        </div>
    
    );
}
 
export default MainEdit;