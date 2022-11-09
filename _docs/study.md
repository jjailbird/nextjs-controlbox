# Next.js

## References

[Getting started with MUI and Next.js](https://blog.logrocket.com/getting-started-with-mui-and-next-js/)

[A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

[Canvas with Reat.js](https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258)

[Canvas - 원호 그리기](https://squll1.tistory.com/entry/canvas-arc-%EC%9B%90%ED%98%B8-%EA%B7%B8%EB%A6%AC%EA%B8%B0)


```javascript


    $('#draw').on('click',function(){
        var start=$('#start').val()*Math.PI;
        var end=$('#end').val()*Math.PI;
        var cc=$('#cc').is(":checked");
        console.log(false);

        console.log(start+', '+end+', '+cc);

        var canvas=document.getElementById('myCanvas4');
        var context=canvas.getContext('2d');

        var x=canvas.width/2;
        var y=canvas.height/2;
        var startAngle=0*Math.PI;
        var endAngle=2*Math.PI;
        var radius=70;

        context.clearRect(0,0,canvas.width,canvas.height);

        context.beginPath();
        context.arc(x,y,radius,startAngle,endAngle,false);
        context.lineWidth=19;
        context.strokeStyle='gray';
        context.stroke();

        context.beginPath();
        context.arc(x,y,radius,start,end,true);
        context.lineWidth=14;
        context.strokeStyle='blue';
        context.stroke();

        context.font='10pt Arial';
        context.fillText('1',x-radius-20,y+5);
        context.fillText('1.5',x-10,y-radius-15);
        context.fillText('0(2)',x+radius+15,y+5);
        context.fillText('0.5',x-10,y+radius+25);
   
   });

    $('#draw').trigger('click');

```