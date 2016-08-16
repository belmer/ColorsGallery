import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import Slider from 'rc-slider';
class EditPanel extends Component 
{
	constructor(props){
		super(props);

		this.state={
			radius:0,
			bgColor:'#CEB2B2',
			size:0
		};
		this.onSliderChange=this.onSliderChange.bind(this);
		this.onAfterChange=this.onAfterChange.bind(this);
		this.handleColorChange=this.handleColorChange.bind(this);
		this.handleSave=this.handleSave.bind(this);
		this.handleRemove=this.handleRemove.bind(this);
		this.removeCompleted=this.removeCompleted.bind(this);
		this.saveCompleted =this.saveCompleted.bind(this);
	}

	onSliderChange(value) 
	{
		if(this.props.box){
			this.props.radiusChange(value);
		}

		this.setState({
			radius:value
		});
	}

	handleColorChange(color)
	{
		if(this.props.box){
			this.props.bgChange(color.hex);
		}
		this.setState({bgColor:color.hex});
	}

	handleSave()
	{
		// Non-selected
		if(!this.props.box){

			Messenger().post({
				message: 'Please select item from the gallery.',
				type: 'error',
				showCloseButton: true
			});

			return;
		}

		const firebase=this.props.firebaseRef;

		firebase.update({
			radius:this.state.radius,
			bgColor:this.state.bgColor
		},this.saveCompleted);
	}

	handleRemove()
	{
		const firebase=this.props.firebaseRef;

		firebase.remove(this.removeCompleted);
	}

	handleSizeChange(e)
	{
		e.preventDefault();

		if(this.props.box){
			this.props.sizeChange(e.target.value);
		}
		this.setState({size:e.target.value});
	}

	saveCompleted()
	{
		
		const item=this.props.box.name;
		
		Messenger().post({
			message: item+' has been saved.',
			type: 'success',
			showCloseButton: true
		});
	this.props.whenChangeDone();
	}

	removeCompleted()
	{
		const item=this.props.box.name;
		Messenger().post({
			message: item+' has been removed from the gallery.',
			type: 'success',
			showCloseButton: true
		});

	this.props.whenChangeDone();

	}

	componentWillReceiveProps(nextProps)
	{
		if(nextProps.box){
			this.setState({
				radius:nextProps.box.radius,
				bgColor:nextProps.box.bgColor,
				size:nextProps.box.size
			});
		}
	}

	onAfterChange(value) {
		console.log(value);
	}

	render(){
		return (<div className='col-md-3 editPanel'>
					<div>
						<div>
						{
							this.props.box ? `You selected: ${this.props.box.name}` : 'Select Item to Edit'
						}
						</div>

						<div className='inputWrapper'>
							<div className='bottom10'>Box Radius:</div>
							<Slider 
								value={this.state.radius} 
								onChange={this.onSliderChange} 
								onAfterChange={this.onAfterChange} />
						</div>

						<div className='inputWrapper'>
							<div className='bottom10'>Size:</div>
							 <input type="number" 
							 value={this.state.size}
							 onChange={this.handleSizeChange.bind(this)}
							 className="form-control" id="size" placeholder="Size"/>
						</div>

						<div className='inputWrapper'>
							<div className='bottom10'>Background Color:</div>
							<ChromePicker 
							 color={this.state.bgColor} 
							 onChangeComplete={this.handleColorChange}/>
						</div>

						<div className='inputWrapper'>
							<button type="button" onClick={this.handleSave} 
							className={`btn btn-primary btn-lg btn-block ${this.props.box ? '':'disabled'}`}>Save</button>
						</div>
						{
							this.props.box ? <div className='inputWrapper'>
												<button type="button" onClick={this.handleRemove} 
												className='btn btn-danger btn-lg btn-block'>{`Remove ${this.props.box.name}`}</button>
											</div> :null
						}
					</div>
				</div>)
	}
}

export default EditPanel;

