var data = 
    "<ul>"+
        "<li class=\"issue\"><a href=\"#\" ondblclick=\"loadNode('mynode')\">"+
                "&nbsp;&nbsp;&nbsp;Sup?</a>"+
            "<ul>"+
                "<li class=\"position\"><a href=\"#\" ondblclick=\"loadNode('othernode')\">"+
                    "&nbsp;&nbsp;&nbsp;Hello World</a>"+
                    "<ul>"+
                        "<li class=\"issue\"><a href=\"#\" ondblclick=\"loadNode('whynode')\">"+
                            "&nbsp;&nbsp;&nbsp;Why?</a>"+
                            "<ul>"+
                                "<li class=\"issue\"><a href=\"#\" ondblclick=\"loadNode('whynotnode')\">"+
                                    "&nbsp;&nbsp;&nbsp;Why not?</a>"+
                                "</li>"+
                            "</ul>"+
                        "</li>"+ 
                    "</ul>"+
                "</li>"+
                "<li class=\"position\">&nbsp;&nbsp;&nbsp;Foo</li>"+
                "<li class=\"position\"><a href=\"#\" ondblclick=\"loadNode('anothernode')\">"+
                        "&nbsp;&nbsp;&nbsp;Second Response, a good one!</a>"+
                "</li>"+
            "</ul>"+
        "</li>"+
    "</ul>";

module.exports = data;