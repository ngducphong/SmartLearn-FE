import React, {useEffect, useState} from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Grid, TextField, Button } from "@mui/material";
import { getPaymentChartData, getUserAccountRegistrationData } from "../../../api/userAPIs.js";
import { message } from "antd";

export default function HomeAdmin() {
    const [studentChart, setStudentChart] = useState([]);
    const [amountChart, setAmountChart] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());

    const userAccountRegistration = async (year) => {
        try {
            const res = await getUserAccountRegistrationData(year);
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            const dataChart = Object.keys(res).map(month => ({
                name: monthNames[month - 1],
                value: res[month]
            }));
            setStudentChart(dataChart);
        } catch (error) {
            message.error('Failed to fetch user registration data');
            console.error('Error fetching user registration data:', error);
        }
    };

    const paymentChartData = async (year) => {
        try {
            const res = await getPaymentChartData(year);
            const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            const dataChart = Object.keys(res).map(month => ({
                name: monthNames[month - 1],
                value: res[month]
            }));
            setAmountChart(dataChart);
        } catch (error) {
            message.error('Failed to fetch payment data');
            console.error('Error fetching payment data:', error);
        }
    };

    const handleSearch = () => {
        userAccountRegistration(year);
        paymentChartData(year);
    };

    useEffect(() => {
        userAccountRegistration();
        paymentChartData();
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} style={{ padding: "50px" }}>
                <div>
                    <TextField
                        label="Năm"
                        variant="outlined"
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        style={{ marginRight: "10px" }}
                    />
                    <Button variant="contained" color="primary" onClick={handleSearch} style={{height:"56px"}}>
                        Tìm kiếm
                    </Button>
                </div>

            </Grid>
            <Grid item xs={12} md={6}>
                <Chart1 studentChart={studentChart} />
            </Grid>
            <Grid item xs={12} md={6}>
                <Chart2 amountChart={amountChart} />
            </Grid>
        </Grid>
    );
}

const Chart1 = ({ studentChart }) => (
    <div style={{ padding: "20px" }}>
        <h3>Biểu đồ số lượng học viên</h3>
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={studentChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    </div>
);

const Chart2 = ({ amountChart }) => (
    <div style={{ padding: "20px" }}>
        <h3>Biểu đồ doanh thu</h3>
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={amountChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis width={100} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    </div>
);
