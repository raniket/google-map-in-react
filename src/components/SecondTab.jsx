import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCurrentPath } from '../actions/';
import tableData from '../data/tableData';

class SecondTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      person: tableData
    }
  }

  componentDidMount() {
    this.props.updateCurrentPath(this.props.match.path);
  }

  render() {

    const tableRecord = this.state.person.map(item => (
      <tr key={item.id}>
        <td className="pt-3-half">{item.name}</td>
        <td className="pt-3-half">{item.age}</td>
        <td className="pt-3-half">{item.companyName}</td>
        <td className="pt-3-half">{item.country}</td>
        <td className="pt-3-half">{item.city}</td>
      </tr>
    ));

    return (
      <div>
        <div className="card animated fadeInRightBig fast">
          <h3 className="card-header text-center font-weight-bold text-uppercase py-4">Dummy Table</h3>
          <div className="card-body">
            <div id="table" className="table-editable">
              <table className="table table-bordered table-responsive-md table-striped text-center">
                <tbody>
                  <tr>
                    <th className="text-center">Person Name</th>
                    <th className="text-center">Age</th>
                    <th className="text-center">Company Name</th>
                    <th className="text-center">Country</th>
                    <th className="text-center">City</th>
                  </tr>
                  {tableRecord}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const currentPath = (ownProps.match.path);
  return {
    currentPath: currentPath,
  }
}

const mapDispatchToProps = {
  updateCurrentPath: updateCurrentPath,
}

export default connect(mapStateToProps, mapDispatchToProps)(SecondTab);
