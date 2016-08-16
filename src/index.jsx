import _ from  'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import GalleryHeader from './components/gallery_header';
import Gallery from './components/gallery';
import EditPane from './components/edit';
import ReactFire from 'reactfire';
import Firebase from 'firebase';

const fireURL='https://spike101-1490c.firebaseio.com/';

const config = {
	apiKey: "AIzaSyC-92aBsOBa0lRBhCvvyUcYn6Glj6nEblk",
	authDomain: "spike101-1490c.firebaseapp.com",
	databaseURL: "https://spike101-1490c.firebaseio.com",
	storageBucket: "spike101-1490c.appspot.com",
};

var App = React.createClass({

	mixins: [ReactFire],
	getInitialState:function()
	{
			Firebase.initializeApp(config);

		return {
			selectedBox:null,
			firebaseRef:null
		};
	},

	componentWillMount:function()
	{

		const ref = Firebase.database().ref("items");

		this.bindAsArray(ref,'items');

	},

	handleRadiusChange(value)
	{
		let tmp=this.state.selectedBox;
		tmp.radius=value;
		this.setState({selectedBox:tmp});
	},

	handleBGChange(value){

		let tmp=this.state.selectedBox;
		tmp.bgColor=value;
		this.setState({selectedBox:tmp});
	},

	handleSizeChange(value){

		let tmp=this.state.selectedBox;
		tmp.size=value;
		this.setState({selectedBox:tmp});	
	},

	handleChangeDone(){
		//Reset selected
		this.setState({selectedBox:null});
	},

	handleBoxSelected(box)
	{
		const ref = Firebase.database().ref(`items/${box['.key']}`);

		this.setState({selectedBox:box,firebaseRef:ref});
	},

	render:function(){
		return (<div>
			<GalleryHeader/>
			<EditPane 
				radiusChange={this.handleRadiusChange} 
				bgChange= {this.handleBGChange}
				sizeChange ={this.handleSizeChange}
				box={this.state.selectedBox} 
				whenChangeDone={this.handleChangeDone}
				firebaseRef={this.state.firebaseRef}/>
			<Gallery 
				whenSelected={this.handleBoxSelected} 
				galleryItems={this.state.items}/>
		</div>)

	}

})

ReactDOM.render(<App />, document.querySelector('.container'))