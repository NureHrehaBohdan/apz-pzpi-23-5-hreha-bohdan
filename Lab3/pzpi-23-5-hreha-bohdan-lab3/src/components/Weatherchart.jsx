import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";


export default function WeatherChart({ data, dataKey, color, label, multi }) {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="timestamp"
                    tickFormatter={(value) =>
                        new Date(value).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit"
                        })
                    }
                />
                <YAxis />
                <Tooltip />

                {multi ? (
                    <>
                        <Line type="monotone" dataKey="tempAverage" stroke="#ff7300" />
                        <Line type="monotone" dataKey="windAverage" stroke="#387908" />
                        <Line type="monotone" dataKey="humidityAverage" stroke="#8884d8" />
                        <Line type="monotone" dataKey="pressureAverage" stroke="#82ca9d" />
                    </>
                ) : (
                    <Line
                        type="monotone"
                        dataKey={dataKey}
                        stroke={color}
                        name={label}
                        isAnimationActive={false}
                    />
                )}
            </LineChart>
        </ResponsiveContainer>
    );
}