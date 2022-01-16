
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

const domContainer = document.querySelector('#experiences');
ReactDOM.render(<Experiences />, domContainer);