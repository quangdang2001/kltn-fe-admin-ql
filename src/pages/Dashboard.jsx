import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import StatusCard from "../components/status-card/StatusCard";
import Table from "../components/table/Table";
import Badge from "../components/badge/Badge";
import { useHistory } from "react-router-dom";
import {
  getCards,
  getCategoryTrending,
  getLastOrders,
  getProductTrending,
  getTopOrders,
} from "../actions/dashboardActions";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Row,
  Col,
  Form,
  Dropdown,
  Button,
  OverlayTrigger,
} from "react-bootstrap";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const topCustomers = {
  head: ["user", "total orders", "total spending"],
};

const renderCusomerHead = (item, index) => <th key={index}>{item}</th>;

const renderCusomerBody = (item, index) => (
  <tr key={index}>
    <td>
      <b>{item?._id[0]?.name}</b>
    </td>
    <td>
      <b>{item?.countOrder}</b>
    </td>
    <td>
      <b>{item?.sumTotalPrice}</b>
    </td>
  </tr>
);

const latestOrders = {
  header: ["order id", "user", "total price", "date", "status"],
};

const orderStatus = {
  shipping: "primary",
  pending: "warning",
  paid: "success",
  refund: "danger",
  Shipping: "primary",
  Pending: "warning",
  Paid: "success",
  Refund: "danger",
  shipped: "success",
  Shipped: "success",
};

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>
      <b>{index}</b>
    </td>
    <td>
      <b>{item?.user[0].name}</b>
    </td>
    <td>
      <b>{item?.totalPrice}</b>
    </td>
    <td>
      <b>{item?.createdAt}</b>
    </td>
    <td>
      <Badge
        type={orderStatus[item?.status.statusNow]}
        content={item?.status.statusNow}
      />
    </td>
  </tr>
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Product Trending",
    },
  },
};

const lastDaysProductTrending = [
  { name: "7 days", value: 7 },
  { name: "30 days", value: 30 },
  { name: "90 days", value: 90 },
  { name: "360 days", value: 360 },
];

const lastDaysCateTrending = [
  { name: "30 days", value: 30 },
  { name: "90 days", value: 90 },
  { name: "360 days", value: 360 },
  { name: "All days", value: 9999 },
];

const Dashboard = ({history}) => {
  const [lastDateProduct, setLastDateProduct] = useState({ name: "7 days", value: 7 })
  const [lastDateCate, setLastDateCate] = useState({ name: "All days", value: 9999 })
  const dispatch = useDispatch();
  const cardsReducer = useSelector((state) => state.cardsReducer);
  const { cards } = cardsReducer;
  const { users } = useSelector((state) => state.topOrder);
  const { orders } = useSelector((state) => state.lastOrder);
  const { cateTrendings } = useSelector((state) => state.cateTrending);
  const { productTrendings } = useSelector((state) => state.productTrending);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const isAdmin = () => {
    if (userInfo && userInfo.data.user.isAdmin) {
        return true;
    }
  };

  useEffect(() => {
    if (!isAdmin()) {
      history.push("/login")
    }
    dispatch(getCards());
    dispatch(getLastOrders());
    dispatch(getTopOrders());
    dispatch(getProductTrending(lastDateProduct.value));
    dispatch(getCategoryTrending(9999));
  }, []);

  const getProductTrendingData = () => {
    const labels = productTrendings?.map((product) => product._id);
    const data = {
      labels,
      datasets: [
        {
          label: "Number of order",
          data: productTrendings?.map((product) => product.countOrder),
          backgroundColor: "rgba(4, 59, 92, 1)",

        }
      ],
    };
    return data;
  };

  const getProductRevenueTrending = () => {
    const labels = productTrendings?.map((product) => product._id);
    const data = {
      labels,
      datasets: [
        {
          label: "Revenue",
          data: productTrendings?.map((product) => product.sumRevenue),
          backgroundColor: "rgba(220,20,60, 1)"
        },
      ],
    };
    return data;
  }

  const getCateTrendingData = () => {
    const labels = cateTrendings?.map(item => item._id);
    const data = {
      labels: labels ? labels : [],
      datasets: [
        {
          label: 'Number of order',
          data: cateTrendings?.map(item => item.countOrder),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    return data;
  };

  const getProductTrendingLastDate = (lastDate) => {
    setLastDateProduct(lastDate)
    dispatch(getProductTrending(lastDate.value));
  }

  const getCategoryTrendingLastDate = (lastDate) => {
    setLastDateCate(lastDate)
    dispatch(getCategoryTrending(lastDate.value));
  }
  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
      <div className="row">
        <div className="col-12">
          <div className="row">
            {cards &&
              cards.map((item, index) => (
                <div className="col-6" key={index}>
                  <StatusCard
                    icon={item?.icon}
                    count={item?.count}
                    title={item?.title}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div
              className="card__header"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div className="col-6">
                <h3>Product Trending</h3>
              </div>
              <Dropdown>
                <Dropdown.Toggle>{lastDateProduct.name}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {lastDaysProductTrending.map((item) => (
                    <Dropdown.Item onClick={() => getProductTrendingLastDate(item)}>{item.name}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div
              className="card__body"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Bar data={getProductTrendingData()} />
            </div>
            <div
              className="card__body"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Bar data={getProductRevenueTrending()} />
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card">
            <div
              className="card__header"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div className="col-6">
                <h3>Category Trending</h3>
              </div>
              <Dropdown>
                <Dropdown.Toggle>{lastDateCate.name}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {lastDaysCateTrending.map((item) => (
                    <Dropdown.Item onClick={() => getCategoryTrendingLastDate(item)}>{item.name}</Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div
              className="card__body"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <div className="col-6">
                <Doughnut data={getCateTrendingData()} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card">
            <div className="card__header">
              <h3>top customers</h3>
            </div>
            <div className="card__body">
              {users && (
                <Table
                  headData={topCustomers.head}
                  renderHead={(item, index) => renderCusomerHead(item, index)}
                  bodyData={users}
                  renderBody={(item, index) => renderCusomerBody(item, index)}
                />
              )}
            </div>
            <div className="card__footer">
              <Link to="/customers">view all</Link>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card__header">
              <h3>latest orders</h3>
            </div>
            <div className="card__body">
              {orders && (
                <Table
                  headData={latestOrders.header}
                  renderHead={(item, index) => renderOrderHead(item, index)}
                  bodyData={orders}
                  renderBody={(item, index) => renderOrderBody(item, index)}
                />
              )}
            </div>
            <div className="card__footer">
              <Link to="/orders">view all</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
