import React, { Component } from "react";
import Banner from "./sections/Banner";
import Partners from "./sections/Partners";
import Roadmap from "./sections/Roadmap";
import Tokenomics from "./sections/Tokenomics";
import Whitepaper from "./sections/Whitepaper";
import Exchange from "./sections/Exchance";
import Contact from "./sections/Contact";

class Main extends Component {
    constructor(props){
        super(props);

        this.state = {
            windowH: 0,
            page: 0,
            touchxS: 0,
            touchxE: 0,
            canscroll: true,
        }
    }
    componentDidMount() {
        this.setState({
            windowH: window.visualViewport.height
        })
        window.scrollTo(0, 0);
        window.addEventListener("wheel", this.handleWay.bind(this));
        window.addEventListener("touchstart", this.handleTStart.bind(this));
        window.addEventListener("touchend", this.handleTEnd.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
    }
    handleResize = () => {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    handleTStart = (e) => {
        this.setState({
            touchxS: e.touches[0].clientX
        })
    }
    handleTEnd = async (e) => {
        await this.setState({
            touchxE: e.changedTouches[0].clientX
        });
        if(this.state.touchxE - this.state.touchxS > 10 || this.state.touchxE - this.state.touchxS < -10){
            this.handleWay({deltaY: this.state.touchxE - this.state.touchxS})
        }
        await this.setState({
            touchxS: 0,
            touchxE: 0
        });
    }
    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    handleWay = async (e) => {
        if(this.state.canscroll){
            if (e.deltaY < 0){

                await this.setState({
                    page: this.state.page==0 ? 0 : (this.state.page - 1),
                    canscroll: false,
                });
                for(var i = ((this.state.page + 1)*this.state.windowH/10); i >= ((this.state.page)*this.state.windowH/10); i--){
                    await window.scrollTo(0, i*10);
                    await this.sleep(7);
                }
            }

            else{
                await this.setState({
                    page: this.state.page == 6 ? 6 : (this.state.page + 1),
                    canscroll: false,
                });
                for(var i = ((this.state.page - 1)*this.state.windowH/10); i <= ((this.state.page)*this.state.windowH/10); i++){
                    await window.scrollTo(0, i*10);
                    await this.sleep(7);
                }
            }
            await this.sleep(500);
            this.setState({
                canscroll: true,
            })
        }

    }
    componentWillUnmount() {
        window.removeEventListener("wheel", this.handleWay.bind(this));
        window.removeEventListener("touchstart", this.handleTStart.bind(this));
        window.removeEventListener("touchend", this.handleTEnd.bind(this));
    }
    handleNavigate = async (ind) => {
        await this.setState({
            page: ind,
        });
        await window.scrollTo(0, (this.state.page)*this.state.windowH);
    }
    render(){
        return (
            <>
                <div className="navigators">
                    <span onClick={this.handleNavigate.bind(this, 0)} className={this.state.page == 0 ? "navigator active" : "navigator"}></span>
                    <span onClick={this.handleNavigate.bind(this, 1)} className={this.state.page == 1 ? "navigator active" : "navigator"}></span>
                    <span onClick={this.handleNavigate.bind(this, 2)} className={this.state.page == 2 ? "navigator active" : "navigator"}></span>
                    <span onClick={this.handleNavigate.bind(this, 3)} className={this.state.page == 3 ? "navigator active" : "navigator"}></span>
                    <span onClick={this.handleNavigate.bind(this, 4)} className={this.state.page == 4 ? "navigator active" : "navigator"}></span>
                    <span onClick={this.handleNavigate.bind(this, 5)} className={this.state.page == 5 ? "navigator active" : "navigator"}></span>
                    <span onClick={this.handleNavigate.bind(this, 6)} className={this.state.page == 6 ? "navigator active" : "navigator"}></span>
                </div>

                <Banner
                    active={"active-" + (this.state.page)}
                />
                <Exchange
                    active={"active-" + (this.state.page)}
                />
                <Roadmap
                    active={"active-" + (this.state.page)}
                />
                <Whitepaper
                    active={"active-" + (this.state.page)}
                />
                <Tokenomics
                    active={"active-" + (this.state.page)}
                />
                <Partners
                    active={"active-" + (this.state.page)}
                />
                <Contact
                    active={"active-" + (this.state.page)}
                />
            </>
        )
    }
}

export default Main;