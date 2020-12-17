import React, {Component} from 'react';
import Axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class EditExercise extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount(){
        const { match: { params } } = this.props;
        Axios.get(`http://localhost:5000/exercises/${params.id}`)
            .then(res => {
                this.setState({
                    username: res.data.username,
                    description: res.data.description,
                    duration: res.data.duration,
                    date: new Date(res.data.date)
                });
            })
            .catch(err => console.log(err));
            Axios.get("http://localhost:5000/users")
            .then(res => {
                if(res.data.length > 0){
                    this.setState({
                        users: res.data.map(user => user.username)
                    });
                }
            })
            .catch(err => console.log(err));
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(e) {
        this.setState({
            date: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);

        const { match: { params } } = this.props;
        Axios.post(`http://localhost:5000/exercises/update/${params.id}`, exercise)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        window.location = "/";
    }

    render() {
        return(
            <div>
                <h3>Update Exercise</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                                {
                                    this.state.users.map(function(user) {
                                        return <option key={user} value={user}>{user}</option>
                                    })
                                }
                        </select>
                    </div>
                    <div className="form-group">
                         <label>Description: </label>
                         <input type='text' required className='form-control' value={this.state.description} onChange={this.onChangeDescription}/>
                    </div>
                    <div className="form-group">
                         <label>Duration: </label>
                         <input type='text' required className='form-control' value={this.state.duration} onChange={this.onChangeDuration}/>
                    </div>
                    <div className="form-group">
                         <label>Date: </label>
                         <DatePicker selected={this.state.date} onChange={this.onChangeDate}/>
                    </div>
                    <div className="form-group">
                    <input type='submit' value="Update" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}