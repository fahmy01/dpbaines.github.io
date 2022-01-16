
class Experience extends React.Component {
    render() {
        return (
            <div className="project-container">
                <div className="project-cell" style={{borderRightColor: this.props.hintColor}}>
                    <div className="project-time">{this.props.time}</div>
                    <div className="project-title">{this.props.title}</div>
                    <div className="project-role">{this.props.role}</div>
                    <div className="project-description">{this.props.description}</div>
                </div>
            </div>
        );
    }
}

class Projects extends React.Component {
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

const domContainer = document.querySelector('#projects');
ReactDOM.render(<Projects />, domContainer);