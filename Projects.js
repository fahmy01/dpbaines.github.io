
function close_modal() {
    const modalBox = document.querySelector(".modal");
        modalBox.style.display = "none";
}

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: props.page
        };
    }

    handleClick() {
        this.props.updateCallback(this.props.page, this.props.hintColor);
        const modalBox = document.querySelector(".modal");
        modalBox.style.display = "block";
    }

    render() {
        const urlStyle = "url('" + this.props.url + "')";

        return (
            <div className="project-container" onClick={() => this.handleClick()}>
                <div className="project-cell">
                    <div className="project-title" style={{borderColor: this.props.hintColor}}>{this.props.title}</div>
                    <div className="project-summary">{this.props.summary}</div>
                    <div className="project-image" style={{backgroundImage: urlStyle}}></div>
                </div>
            </div>
        );
    }
}

class PopupContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: [{
                "type": "text",
                "content": "Loading..."
            }],
            currUrl: this.props.page
        };
    }

    componentDidMount() {
        fetch(this.props.page)
            .then(response => response.json())
            .then(y => this.setState({content: y.list}));
    }

    componentDidUpdate() {
        if (this.state.currUrl != this.props.page) {
            this.componentDidMount();
            this.setState({currUrl: this.props.page});
        }
    }

    render() {
        const output = this.state.content.map((val => {
            switch(val.type) {
                case "text":
                    return <p className="popup-text">{val.content}</p>
                    break;
                case "image":
                    return (
                        <div>
                            <img className="popup-img" src={val.url}></img>
                            <p className="popup-img-caption">{val.caption}</p>
                        </div>
                    );
                    break;
                case "title":
                    return <p className="popup-title" style={{borderColor: this.props.hintColor}} >{val.content}</p>
                    break;
                case "link":
                    return (
                    <div className="popup-link" style={{borderColor: this.props.hintColor}}>
                        <a href={val.url} style={{color: "black"}}>
                            {val.content}
                        </a>
                    </div>);
                    break;
                default:
                    return <p>Invalid tag type</p>
            }
        }));
        return (
            <div>
                {output}
            </div>
        );
    }
}

class Projects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projs : [{
                "title": "Loading...",
                "summary": "",
                "url": "res/img/mandelbrot.png",
                "page": "projects/mandelbrot.json",
                "color": "#007DC3"
            }],
            currentPage: "projects/mandelbrot.json",
            currentHintColor: "#007DC3"
        };
    }

    componentDidMount() {
        let expUrl = "projects.json";
        fetch(expUrl)
            .then(response => response.json())
            .then(y => this.setState({projs: y.projects}));
    }

    updateStateCallback(update_url, hintColor) {
        this.setState({currentPage: update_url, currentHintColor: hintColor});
        console.log(update_url);
        console.log(this.state);
    }

    render() {
        const mappedProjs = this.state.projs.map((proj) =>
            <Project key={proj.page} title={proj.title} hintColor={proj.color} url={proj.url} page={proj.page} summary={proj.summary} updateCallback={((update_url, hintColor) => this.updateStateCallback(update_url, hintColor))} />
        );

        return (
            <div>
                {mappedProjs}
                <div className="modal" onClick={() => close_modal()}>
                    <div className="modal-content" onClick={(event) => event.stopPropagation()}>
                        <PopupContent page={this.state.currentPage} hintColor={this.state.currentHintColor} />
                    </div>
                </div>
            </div>
        );
    }
}

class Experience extends React.Component {
    render() {
        return (
            <div className="experience-container">
                <div className="experience-cell" style={{borderRightColor: this.props.hintColor}}>
                    <div className="experience-time">{this.props.time}</div>
                    <div className="experience-title">{this.props.title}</div>
                    <div className="experience-role">{this.props.role}</div>
                    <div className="experience-description">{this.props.description}</div>
                </div>
            </div>
        );
    }
}

class Experiences extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exps : [{
                "title": "Loading...",
                "role": "",
                "time": "",
                "description": "",
                "color": "#007DC3"
            }]
        };
    }

    componentDidMount() {
        let expUrl = "experiences.json";
        fetch(expUrl)
            .then(response => response.json())
            .then(y => this.setState({exps: y.experiences}));
    }

    render() {
        const mappedExps = this.state.exps.map((exp) =>
            <Experience key={exp.title} title={exp.title} hintColor={exp.color} time={exp.time} role={exp.role} description={exp.description} />
        );
        // console.log(Array.isArray(mappedExps));

        return (
            <div>
                {mappedExps}
            </div>
        );
    }
}

const expContainer = document.querySelector('#experiences');
ReactDOM.render(<Experiences />, expContainer);

const projContainer = document.querySelector('#projects-box');
ReactDOM.render(<Projects />, projContainer);