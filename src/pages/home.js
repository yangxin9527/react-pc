import React,{Component} from "react";
import NavBar from '../components/navbar'
import TopBar from '../components/topbar'
import Footer from '../components/footer'
import "./home.less"


export default class Home extends Component{
    constructor(props) {
        super(props);
        this.state={
        }
    }
    componentDidMount() {}
    render(){
        return <div className="home-wrap">
            <TopBar/>
            <NavBar/>
            home
            <Footer/>
        </div>
    }
}
