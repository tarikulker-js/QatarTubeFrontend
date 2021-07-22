import { ImMenu } from 'react-icons/im';
import {CgPhone} from 'react-icons/cg';

import $ from 'jquery';
import 'jquery-ui/ui/effect';

import Flag from 'react-world-flags'
require("./components.scss");


/* QUNTU WORKS 2020 UI LIBRARY */
window.onload = (e) => {
    if(localStorage.getItem("theme") === "dark"){
        $(".Header").children(".HeaderRight").children("label").children('input').prop('checked', true);
        $(".MobileHeader").children(".HeaderRight").children("label").children('input').prop('checked', true);
    } else {
        $(".Header").children(".HeaderRight").children("label").children('input').prop('checked', false);
        $(".MobileHeader").children(".HeaderRight").children("label").children('input').prop('checked', false);
    }
}
function QuntuTheme(props){
    document.documentElement.setAttribute('theme', props.mode);
    document.documentElement.style.setProperty('--color1', props.color1);
    document.documentElement.style.setProperty('--color2', props.color2);
    return(<></>);
}

function notify(title,message,type) {

    var notifyElement = $(`<div class='notify' style="display:none"><h2>${title}</h2><h3>${message}</h3></div>`);
    $("#root").append(notifyElement)
    $(notifyElement).fadeToggle(300, () =>{

    });

    $(notifyElement).click(() => {
        $(notifyElement).fadeToggle(300, () =>{
            $(notifyElement).remove();
        });
    });

    setTimeout(() => {
        $(notifyElement).fadeToggle(300, () =>{
            $(notifyElement).remove();
        });
    }, 2000);

}

function RegisterSuccessfull(){
    var parent = $("#registerForm").parent();
    $("#registerForm").remove();
    $(parent).append(`<b>KAYIT BAŞARILI</b>`);
}

function Header(props) {
    return(
        <>
        <div className="Header">
        {
            Object.values(props).map((e) => e)
        }
        </div>
        <div className="MobileHeader" id="MobileHeader">
        { 
            Object.values(props).map((e) => {
                return e;
            })
        }
        </div>
        </>
    );
}
function HeaderLeft(props) {
    var toggleMenu = () => {
        $("#MobileHeader").slideToggle(150);
    }
    return(
        <div className="HeaderLeft">
            {
                Object.values(props).map((e, idx) => e)
            }
            <ImMenu className="burgerMenu" onClick={() => toggleMenu()}/>
        </div>
    );

}
function HeaderCenter(props) {
    
    return(
        <div className="HeaderCenter">
        {
            Object.values(props).map((e) => e)
        }
        </div>
    );
}
function HeaderRight(props) {
    return(
        <div className="HeaderRight">
        {
            Object.values(props).map((e) => e)
        }
        </div>
    );
}
function Content(props) {

    if(props.verticalAlignContent){
        return(
            <div className="Content verticalAlignContent">
            {
                Object.values(props).map((e) => e)
            }
            </div>
        );
    }else {
        return(
            <div className="Content">
            {
                Object.values(props).map((e) => e)
            }
            </div>
        );
    }

}
function Footer(props) {
    return(
    <div className="Footer">
        {
            Object.values(props).map((e) => e)
        }
    </div>
    );
}
function FooterTop(props){
    return(
        <div className="FooterTop">
            {
                Object.values(props).map((e) => e)
            }
        </div>
        );
}
function FooterMiddle(props){
    return(
        <div className="FooterMiddle">
            {
                Object.values(props).map((e) => e)
            }
        </div>
        );
}
function FooterBottom(props){
    return(
        <div className="FooterBottom">
            {
                Object.values(props).map((e) => e)
            }
        </div>
        );
}
function Toggle (props){
    var toggleFunc = () => {
        if(localStorage.getItem("theme") === "dark"){
            $(".Header").children(".HeaderRight").children("label").children('input').prop('checked', true);
            $(".MobileHeader").children(".HeaderRight").children("label").children('input').prop('checked', true);
        } else {
            $(".Header").children(".HeaderRight").children("label").children('input').prop('checked', false);
            $(".MobileHeader").children(".HeaderRight").children("label").children('input').prop('checked', false);
        }
    }


    return (<>
        <label className="switch" onClick={() => toggleFunc()}>
            <input type="checkbox" onClick={() => props.onClick()} /> 
            <div></div>
        </label></>
    );


} 
function GraphicCardItem(props){
    return(
        <div className="graphicCardItem">
            <img src={props.img} alt="test"/>
                <div className="cardtextDiv">
                    <h2>{props.headText}</h2>
                    <p>{props.contentText}</p>
                    <div>   
                    {
                        props.children
                    }
                    </div>
                </div>
        </div>
    );
}
function PhoneNumber(props){
    
    return(
        <div className="phoneNumber">
            <CgPhone/>
            <span>{props.Number}</span>
        </div>
    );
}

function ToolTip(element,text){
    var tooltip = $(`<div class="toltip"><h3>${text}</h3></div>`);
    $(element).parent().append(tooltip);
    $(element).after($(tooltip))
    $(tooltip).append($(element));

    $(element).one("focus", () => {
        $(tooltip).after($(element));
        $(tooltip).remove();
        $(element).focus();
    });
}

function RegisterPanel (props) {
    return(
        <div className="registerPanel">
            <div className="formDiv">
                <div id="registerForm">
                    {
                        props.children
                    }
                </div>
            </div>
            {
                    props.imageUrl ? <div className="imageDiv" style={{background:`url(${props.imageUrl})`}}><div className="textContain"><h2 style={{ color: "white" }}>{props.imageHeaderText}</h2><p style={{ color: "white" }}>{props.imageContentText}</p></div></div> : <></>
            }
            {
                    props.videoUrl ? <div className="videoDiv"><video src={props.imageUrl}/></div> : <></>
            }

        </div>
    );
    
}


function LanguageSelector(props){
    var { Languages, id,onSelectedChange } = props;

    var handleClick =  (e) => {
        var select = $("#" + e);
        $(select).children(".option").slideToggle(100,function(){
            if($(select).children(".option").is(':visible'))
                $(select).children(".option").css({display:'flex'});
        });
    }

    var handleSelect =  (e,btn) => {
        var thisB = $("#"+btn);
        $("#"+e).children('.selectedValue').empty();
        $(thisB).clone().appendTo($("#"+e).children('.selectedValue'));

        onSelectedChange($(thisB).attr("data-option-value"));
    }
    return(
        <>
            <div className="select" style={props.style} id={id} onClick={() => handleClick(id)}>
                <div className="selectedValue"> 
                
                {
                   props.defLanguage !=null ? <submit type="submit" className="optionA"> <Flag code={ props.defLanguage.toString() } /></submit> : <> </>
                }

                </div>
                <div className="option" id={`${id}-option`} >
                    {
                    Languages.map((e, idx) => 
                    <submit key={idx} id={`${id}-btn-${e}`} type="submit" onClick={() => handleSelect(id,`${id}-btn-${e}`)} data-option-value={e} className="optionA"> 
                    <Flag key={idx} code={ e } />
                    </submit>)
                    }
                </div>
            </div>
            
        </>
    );
}

export {
    QuntuTheme,
    Header,
    Footer,
    FooterTop,
    FooterMiddle,
    FooterBottom,
    HeaderLeft,
    HeaderRight,
    HeaderCenter,
    Content,
    Toggle,
    GraphicCardItem,
    PhoneNumber,
    LanguageSelector,
    RegisterPanel,
    notify,
    RegisterSuccessfull,
    ToolTip
};