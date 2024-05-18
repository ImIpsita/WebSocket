var stompClient=null

function connect(){
	
	let socket= new SockJS("/server1")
	stompClient=Stomp.over(socket);
	stompClient.connect({},function(frame){
		console.log("connected"+frame)
		//hide enterpage
		$('#name-from').addClass('d-none')
		//show chatroom
		$('#chat-Room').removeClass('d-none')
		
		stompClient.subscribe("/topic/return-to",function(response){
			showMessage(JSON.parse(response.body))
		})
		
		
	})
	
}

function showMessage(message){
	
	$("#message-container-table").prepend(`<tr><td><b>${message.name}: </b>${message.content}</td></tr>`)
	
}

function sendMessage(){
	
let jsonob={
	name:localStorage.getItem("name"),
	content:$("#message-value").val()
}	
stompClient.send("/app/message",{}, JSON.stringify (jsonob));
}

$(document).ready((e)=>{
	//alert("test")
	
	
	$("#login").click(()=>{
		
		//fetch name 
		let name=$("#name-value").val()
		localStorage.setItem("name",name)
		
		connect();
		
		
	})
	
	$("#send-btn").click(()=>{
		
		//fetch name 
		
		sendMessage();
		
		
	})
	
	$("#logout").click(()=>{
		
		//fetch name 
		
		localStorage.removeItem("name");
		if(stompClient !=null){
			stompClient.disconnect();
			//show enterpage
		$('#name-from').removeClass('d-none')
		//hide chatroom
		$('#chat-Room').addClass('d-none')
		}
		
		
	})
	
})


