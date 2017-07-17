import React, {Component} from 'react';

class Planet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      population: null,
      orbitalPeriod: null,
      rotationPeriod: null,
      diameter: null,
      terrain: '',
      films: []
    }
  }

  componentWillReceiveProps(nextProps) {
    const {name, population, orbitalPeriod, rotationPeriod, diameter, terrain, films} = nextProps;

    if (this.props.name !== name) {
      this.setState({name, population, orbitalPeriod, rotationPeriod, diameter, terrain, films});
      //this.getFilmTitles(nextProps);
    }
  }

  componentWillMount() {
    const {name, population, orbitalPeriod, rotationPeriod, diameter, terrain, films} = this.props;

    this.setState({name, population, orbitalPeriod, rotationPeriod, diameter, terrain, films});
  }

  render() {
    const {name, population, orbitalPeriod, rotationPeriod, diameter, terrain, films} = this.state;

    if (films.length > 0 && films[0].toString().includes('http')) {
      return <tr></tr>
    }

        return (
          <tr>
            <td>{name}</td>
            <td>{population}</td>
            <td>{diameter}</td>
            <td>{rotationPeriod}</td>
            <td>{orbitalPeriod}</td>
            <td>{terrain}</td>
            <td>{films}</td>
          </tr>
        );
  }
}

export default Planet;
