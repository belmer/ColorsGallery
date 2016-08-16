import React, { Component } from 'react';
import ReactDom from 'react-dom';

const Gallery=(props)=>
{
	if(props.galleryItems.length<=0)
		return <div className='video-detail col-md-9'>Loading...</div>;

	return (
	<div className='video-detail col-md-9'>
		{
			
			props.galleryItems.map((item,i)=>
			{
				return <div
					style={{
						backgroundColor:item.bgColor,
						borderRadius:item.radius,
						width:`${item.size}%`
					}} 
					key={`${item['.key']}`} 
					onClick={()=>{
						props.whenSelected(item);
					}} 
					className='col-md-2 col-xs-12 boxBase'>
				</div>
			})
		}
	</div>)
}
export default Gallery;