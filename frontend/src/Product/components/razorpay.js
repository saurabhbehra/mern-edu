import React from 'react'
import paidCourse from '../../onSuccesspaymnet/pages/PaidCourse';

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}
const razorpay = () => {

    async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		const data = await fetch('http://localhost:5000/order', { method: 'POST' }).then((t) =>
			t.json()
		)

		console.log(data)
	
		const options = {
			key: "rzp_test_ESlvd33ucYv0yc",
			currency: data.currency,
			amount:data.amount,
			order_id: data.id,
			name: 'Donation',
			description: 'Thank you for nothing. Please give us some money',
			handler: (response)=>{
				
			},
			prefill: {
				name:'saurabh',
				email: 'sdfdsjfh2@ndsfdf.com',
				phone_number: '9899999999'
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}
    
    return (
    <div className="mt-5">
      <button onClick={displayRazorpay}>Pay</button> 
    </div>
      
    )
}

export default razorpay
