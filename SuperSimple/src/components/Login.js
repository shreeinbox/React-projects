import React from 'react';

class Login extends React.Component{

    constructor(props) {
        super(props);
        
        //set the state for username and password
        this.state = {
            activeUser : {
                username : '',
                password : '',
            },
            token : ''
          }
    
        // This binding is necessary to make `this` work in the callback
        //this binding is required only when you this this.handleLogin as call back function in onclick
        //not for calling in other methods of this class for example setLoggedInUser.
        
        this.handleLogin = this.handleLogin.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        
        //this.setLoggedInUser = this.setLoggedInUser.bind(this);
    }

    

    getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    
    setLoggedInUser = (sActive, bActive, sToken) => {
        console.log("before sending props: ", sToken)
        this.props.usr(sActive, bActive, sToken)
    }
    

    handleLogin(e){
        e.preventDefault()
        console.log('clicking here')
        
        var csrftoken = this.getCookie('csrftoken')
        var sUser = this.state.activeUser.username
        var sPass = this.state.activeUser.password
        //var objData    

        console.log(sUser)
        console.log(sPass)

        var url = 'http://127.0.0.1:8000/login/'
        
        fetch(url,
            {
                method:'POST',
                headers:{
                    'Content-type': 'application/json',
                    'X-CSRFToken': csrftoken,
                },
                body: JSON.stringify({'username': sUser, 'password':sPass})
            }
        ).then(response => response.json())
        .then(data => {
            console.log(data.auth_token)
            if (data.auth_token !== undefined)
            {
               this.setLoggedInUser(sUser, true, data.auth_token)
            }
            else
            {
                console.log("control coming here...")
                this.setLoggedInUser('',false,'')
            }
            //history.push("/")
            
        })
        .catch(()=>{
            this.setLoggedInUser('',false,'')
        })

    }

    
    

    //we set the state of the task with new value and then
    //we use this state of the item when creating new task in handleSubmit
    handleUsername(e){
        var name = e.target.name
        var value = e.target.value

        console.log('name: ', name)
        console.log('value: ', value)

        this.setState(
            {
                activeUser:{
                ...this.state.activeUser,
                username:value
              }
            }
          )  
    }

    handlePassword(e){
        var name = e.target.name
        var value = e.target.value

        console.log('name: ', name)
        console.log('value: ', value)

        this.setState(
            {
                activeUser:{
                ...this.state.activeUser,
                password:value
              }
            }
          )  
    }
    

    render()
    {
        return(
            <div className='container'>
                <div id='task-container'>
                
                    <div id='form-wrapper'>
                    <h3>Login</h3>
                        <form id='form'>
                            <div className="flex-wrapper">
                                
                                <div style={{flex: 6}}>
                                    <input className="form-control" 
                                           id="idusername"  
                                           type="text" 
                                           onChange={this.handleUsername}
                                           name="username" 
                                           placeholder="Username" />
                                </div>
                                
                                <div style={{flex: 6}}>
                                    <input className="form-control" 
                                           id="idpassword"  
                                           type="text" 
                                           onChange={this.handlePassword}
                                           name="password" 
                                           placeholder="Password" />
                                </div>

                                <div style={{flex: 1}}>
                                    <input id="submit" className="btn btn-warning" 
                                           type="submit" 
                                           name="Login" 
                                           onClick={this.handleLogin} />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}

export default Login;