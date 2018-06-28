
$("#summary").on("click",function(){
    var a =document.querySelectorAll(".ticket_number");
    var b = document.querySelectorAll(".ticket_time");
    var s="";

    for(var i=0;i<a.length;i++){
        s+="["+b[i].textContent+"]"+a[i].textContent+"\n";
    }
    var myTextArea = $('#modal_summary_textarea');
    myTextArea.val(myTextArea.val() + s);
    $("#modal_summary").fadeIn();
});