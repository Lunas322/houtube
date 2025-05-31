const Textlength = function (Text) {

    if (Text.length > 10){
        return Text.slice(0,20) + '...';
    } else {
        return Text
    }


}



export default Textlength