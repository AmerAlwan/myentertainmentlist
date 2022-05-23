import {useSelector} from "react-redux";
import {BarSeries, Chart} from "@devexpress/dx-react-chart";
import {ResponsiveEmbed, Row} from "react-bootstrap";
import {ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from "recharts";
import './MediaPlaytimeGraph.css';

export function MediaPlaytimeGraph(props) {

    const isMobile = /Android|webOS|iPhone|kindle|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const mediaLists = useSelector(state => state.user.mediaLists);

    let moviePlaytimes = 0;
    let tvPlaytimes = 0;
    let gamePlaytimes = 0;

    if (mediaLists)
        mediaLists.forEach(mediaList => {
            mediaList.movies.forEach(movie => {
                moviePlaytimes += movie.playTime
            });
            mediaList.tvs.forEach(tv => {
                tvPlaytimes += tv.playTime
            });
            mediaList.games.forEach(game => {
                gamePlaytimes += game.playTime
            });
        });

    const getHourTime = (value) => Math.floor(value / 60);
    const getDayTime = (value) => Math.floor(getHourTime(value) / 24);
    const getWeekTime = (value) => Math.floor(getDayTime(value) / 7);
    const getMonthTime = (value) => Math.floor(getDayTime(value) / 30);
    const getYearTime = (value) => Math.floor(getMonthTime(value) / 12);
    const getHourTimeInMinutes = (value) => Math.floor(value * 60);
    const getDayTimeInMinutes = (value) => Math.floor(getHourTimeInMinutes(value) * 24);
    const getWeekTimeInMinutes = (value) => Math.floor(getDayTimeInMinutes(value) * 7);
    const getMonthTimeInMinutes = (value) => Math.floor(getDayTimeInMinutes(value) * 30);
    const getYearTimeInMinutes = (value) => Math.floor(getMonthTimeInMinutes(value) * 12);

    console.log(moviePlaytimes);

    const movieYearTime = getYearTime(moviePlaytimes);
    moviePlaytimes -= getYearTimeInMinutes(movieYearTime);
    const movieMonthTime = getMonthTime(moviePlaytimes);
    moviePlaytimes -= getMonthTimeInMinutes(movieMonthTime);
    const movieWeekTime = getWeekTime(moviePlaytimes);
    moviePlaytimes -= getWeekTimeInMinutes(movieWeekTime);
    const movieDayTime = getDayTime(moviePlaytimes);
    moviePlaytimes -= getDayTimeInMinutes(movieDayTime);
    const movieHourTime = getHourTime(moviePlaytimes);
    moviePlaytimes -= getHourTimeInMinutes(movieHourTime);


    console.log(movieYearTime);
    console.log(movieMonthTime);
    console.log(movieWeekTime);
    console.log(movieDayTime);
    console.log(movieHourTime);
    console.log(moviePlaytimes)

    const tvYearTime = getYearTime(tvPlaytimes);
    tvPlaytimes -= getYearTimeInMinutes(tvYearTime);
    const tvMonthTime = getMonthTime(tvPlaytimes);
    tvPlaytimes -= getMonthTimeInMinutes(tvMonthTime);
    const tvWeekTime = getWeekTime(tvPlaytimes);
    tvPlaytimes -= getWeekTimeInMinutes(tvWeekTime);
    const tvDayTime = getDayTime(tvPlaytimes);
    tvPlaytimes -= getDayTimeInMinutes(tvDayTime);
    const tvHourTime = getHourTime(tvPlaytimes);
    tvPlaytimes -= getHourTimeInMinutes(tvHourTime);

    const gameYearTime = getYearTime(gamePlaytimes);
    gamePlaytimes -= getYearTimeInMinutes(gameYearTime);
    const gameMonthTime = getMonthTime(gamePlaytimes);
    gamePlaytimes -= getMonthTimeInMinutes(gameMonthTime);
    const gameWeekTime = getWeekTime(gamePlaytimes);
    gamePlaytimes -= getWeekTimeInMinutes(gameWeekTime);
    const gameDayTime = getDayTime(gamePlaytimes);
    gamePlaytimes -= getDayTimeInMinutes(gameDayTime);
    const gameHourTime = getHourTime(gamePlaytimes);
    gamePlaytimes -= getHourTimeInMinutes(gameHourTime);



    const mediaPlaytimes = [
        {name: 'Movies', years: movieYearTime, months: movieMonthTime, weeks: movieWeekTime, days: movieDayTime, hours: movieHourTime, minutes: moviePlaytimes},
        {name: 'Tvs', years: tvYearTime, months: tvMonthTime, weeks: tvWeekTime, days: tvDayTime, hours: tvHourTime, minutes: tvPlaytimes},
        {name: 'Games', years: gameYearTime, months: gameMonthTime, weeks: gameWeekTime, days: gameDayTime, hours: gameHourTime, minutes: gamePlaytimes}
    ];

    console.log(mediaPlaytimes);

    return (
        <>
            <Row className="justify-content-center align-items-center" style={{
                height: '500px'
            }}>
                <ResponsiveContainer width={isMobile ? '90%' : '60%'} height='80%'>
                    <BarChart width={500} height={300} layout='vertical' barCategoryGap={10} data={mediaPlaytimes} margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 2,
                    }}>
                        <CartesianGrid />
                        <XAxis
                            type="number"
                            domain={[0, 'dataMax + 10']}
                            xAxisId="wmy"
                            orientation="top"
                            label={{value: "Weeks Months Years"}}
                            stroke="white"
                        />
                        <XAxis
                            type="number"
                            domain={[0, 'dataMax + 10']}
                            xAxisId="dhm"
                            orientation="bottom"
                            label={{value: "Days - Hours - Minutes"}}
                            stroke="black"
                        />
                        <YAxis
                            dataKey="name"
                            type="category"
                        />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="years" xAxisId="wmy" stackId="b" fill="#590000FF" minPointSize={2} barSize={32} />
                        <Bar dataKey="months" xAxisId="wmy"  stackId="b" fill="#010169FF" minPointSize={2} barSize={32} />
                        <Bar dataKey="weeks" xAxisId="wmy"  stackId="b" fill="#004F00FF" minPointSize={2} barSize={32} />
                        <Bar dataKey="days" xAxisId="dhm" stackId="a" fill="#FF6767FF" minPointSize={2} barSize={32} />
                        <Bar dataKey="hours" xAxisId="dhm"  stackId="a" fill="#6464FFFF" minPointSize={2} barSize={32} />
                        <Bar dataKey="minutes" xAxisId="dhm"  stackId="a" fill="#4fff4f" minPointSize={2} barSize={32} />
                    </BarChart>
                </ResponsiveContainer>
            </Row>
        </>
    )
}