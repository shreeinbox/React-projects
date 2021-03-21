import React from 'react';

class Logout extends React.Component{

    constructor(props) {
        super(props);
        

    
    }

componentDidMount(){
    console.log("logout token delete: ", this.props.tok)

    const url = 'http://127.0.0.1:8000/logout/';
        fetch(url,{
          method:'POST',
          headers:{
            'Content-type': 'application/json',
            'Authorization': 'Token ' + this.props.tok
        }
        })
        .then(response => response.json())
        .then(data => { console.log("from server msg:", data) })
        .catch(e => alert(e.message));
    
        this.props.resetUsr('', false, '');
}    
/*    componentDidMount(){
        console.log("token--> ", this.props.tok)
        const url = 'http://127.0.0.1:8000/logout/';
        fetch(url,{
          method:'POST',
          headers:{
            'Content-type': 'application/json',
            'Authorization': 'Token ' + this.props.tok
        }
        })
        .then(response => response.json())
        .then(data => { console.log(data) })
        .catch(e => alert(e.message));
    }
*/

    render(){
        return(
            <div className='container'>
                <div id='form-wrapper'>
                    <span>You have successfully logged out!!</span>
                    <span>You can login here again</span>
                </div>
            </div>
        )
    }

}

export default Logout;