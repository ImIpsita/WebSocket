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
	var nameValueDiv = $("#name-value");
	var existingContent = nameValueDiv.html();
	nameValueDiv.html(`<b>${message.name}</b>, ` + existingContent);
	$("#message-container-table").prepend(`<tr><td><b>${message.name}: </b>${message.content}</td></tr>`)
	
}

function sendMessage(){
	
let jsonob={
	name:localStorage.getItem("name"),
	content:$("#message-value").val()
}	
stompClient.send("/app/message",{}, JSON.stringify (jsonob));
$("#message-value").val('');
}

$(document).ready((e)=>{
	//alert("test")
	
	
	$("#login").click(()=>{
		
		//fetch name 
		let name=$("#name-value").val()
		if(name !=''){
		localStorage.setItem("name",name)
		$('#title').html(`Hey <b>${name}</b>,Welcome in Chat Application:)`)
		connect();
		}else{
			alert("invalid Name");
		}
		
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


