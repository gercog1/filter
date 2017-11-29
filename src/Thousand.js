import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Pagination from './Pagination';
import PieChart from 'react-simple-pie-chart';

class Thousand extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [],
            starterState: [],
            pageOfItems: [],
            filterFemale: false,
            filterMale: false,
            sortByName: false,
            data: {
                labels: "female, male",
                datasets: [
                    {
                        label: "My First dataset",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "red",
                        pointColor: "red",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: [1,2]
                    }]
            }
        };

        this.onChangePage = this.onChangePage.bind(this);
        this.filterGender = this.filterGender.bind(this);
        this.sortedByName = this.sortedByName.bind(this);
        this.drawStatistic = this.drawStatistic.bind(this);

    }

    onChangePage(pageOfItems) {

        this.setState({ pageOfItems: pageOfItems });
    }

    downloadItems(){
        this.setState({isLoading: true});
        axios.get('https://randomuser.me/api/?results=1000')
            .then(response => {
                this.setState({items: response.data.results,
                    starterState: response.data.results,
                    isLoading: false,
                    errorMessage: '',
                })})
            .catch(error =>{ this.setState({errorMessage: error.response.status,
                isLoading: false})})

    }
    componentWillMount(){
        this.downloadItems();

    }

    filterGender(number){
        let a = this.state.starterState.slice();
        let b = this.state.starterState.slice();

        if(number === 1){
            this.setState({filterFemale: !this.state.filterFemale,
                filterMale: false,
                items: a.filter( item => {return item.gender === "female"})});
        }
        if(number === 2) {

            this.setState({
                filterMale: !this.state.filterMale,
                filterFemale: false,
                items: b.filter(item => {
                    return item.gender === "male"
                })
            });
        }
        if(number === 3) {
            this.setState({
                filterFemale: false,
                filterMale: false,
                items: this.state.starterState
            })

        }
    }

    sortedByName(){
        this.setState({sortByName: true})
    }

    drawStatistic(){
        let count1 = 0;
        let count2 = 0;
        this.state.items.filter(item=> {
            if(item.gender === "female")
            {
                count1++;
            }
            if(item.gender === "male")
            {
                count2++;
            }

        });
        this.setState({femaleCount: count1,
            maleCount: count2});

    }

    render() {
        const {filterFemale, filterMale} = this.state;

        return (
            <div>
                <div className="hundredBox">
                    <h3>Filter by gender: </h3>
                    <button className={filterFemale ? "selectGenderFalse" : "selectGender"} onClick={()=>this.filterGender(1)}>female</button>
                    <button className={filterMale ? "selectGenderFalse" : "selectGender"} onClick={()=>this.filterGender(2)}>male</button>
                    <button className="selectGender" onClick={()=>this.filterGender(3)}>reset</button>

                </div>
                <div className="hundredBox">
                    <h3>Sort by name: </h3>
                    <button className="selectGender"
                            onClick={()=>this.sortedByName()}>Sort</button>

                </div>
                <div className="statistic">
                    <h3>Statistic: </h3>
                    <button className="selectGender" onClick={()=>this.drawStatistic()}>Draw</button>
                    <div className="pieChart">
                        <PieChart
                            borderWidth={10}
                            slices={[
                                {
                                    color: '#468966',
                                    value: this.state.femaleCount,
                                },
                                {
                                    color: '#FFB03B',
                                    value: this.state.maleCount,
                                },
                            ]}
                        />
                    </div>
                    <h4 className="males">{this.state.maleCount ? "Males: "+ this.state.maleCount : "Males: "}</h4>
                    <h4 className="females">{this.state.femaleCount ? "Females: "+ this.state.femaleCount : "Females: "}</h4>
                </div>
                {
                    this.state.sortByName ?
                        this.state.pageOfItems
                            .sort(function(a, b){
                                var nameA=a.name.first.toLowerCase(), nameB=b.name.first.toLowerCase();
                                if (nameA < nameB)
                                    return -1;
                                if (nameA > nameB)
                                    return 1;
                                return 0;
                            })
                            .map((item, index) => {
                                return (
                                    <div className="item" key={index}>
                                        <h3 className="nameH">{item.name.first + " " + item.name.last}</h3>
                                        <img src={item.picture.medium} alt={item.name.first}/>
                                        <h4>{item.gender}</h4>
                                    </div>
                                )}) :
                        this.state.pageOfItems.map((item, index) => {
                            return (
                                <div className="item" key={index}>
                                    <h3 className="nameH">{item.name.first + " " + item.name.last}</h3>
                                    <img src={item.picture.medium} alt={item.name.first}/>
                                    <h4>{item.gender}</h4>
                                </div>
                            )})

                }

                <div className="paginationContainer">
                    <Pagination items={this.state.items} onChangePage={this.onChangePage} />
                </div>
            </div>
        );
    }
}

export default Thousand;
