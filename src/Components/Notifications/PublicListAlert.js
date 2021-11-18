import React, { Component } from "react";
import "./Styles.css";

import Alert from "../Alerts/Alert";
import { getPublic } from "../../Functions/Get";
import { setSelectOptions, formatDateToLocal } from "../../Functions/Helpers";
import {
  ALERT_LIST,
  ALERT_TIMEOUT,
  NO_ITEMS_ERROR,
  NO_ITEM_MESSAGE,
  ERROR_MESSAGE,
  ZONES,
  TYPE,
} from "../../Functions/Constants";

class ListNotifications extends Component {
  constructor() {
    super();
    this.state = {
      notifications: [],
      filtered_notifications: [],
      zones: "",
      auth_state: "all",

      // Auxiliary form states
      alert: "",
      timeout: "",
    };
  }

  componentDidMount() {
    let zone = "";
    getPublic(zone, this.setNotifications);
  }

  componentWillUnmount() {
    clearTimeout(this.state.timeout);
  }

  // Functions to handle states
  handleChange = (event) => {
    let attribute = event.target.id;
    let value = event.target.value;
    this.setState({ auth_state: value });

    if (attribute == "zones") {
      let zones = value;
      getPublic(zones, this.setNotifications);
    }

    return this.filterNotifications(value);
  };

  // Functions related to requests
  setNotifications = async (response, body) => {
    if (response == "success") {
      this.setState({ filtered_notifications: body });
      return this.setState({ notifications: body });
    }

    this.setState({ notifications: [] });

    if (body == NO_ITEMS_ERROR) {
      return this.buildAlert("attention", NO_ITEM_MESSAGE);
    } else {
      return this.buildAlert("error", ERROR_MESSAGE);
    }
  };

  // Functions to handle alerts
  close = () => {
    return this.setState({ alert: "" });
  };

  buildAlert = (type, text) => {
    clearTimeout(this.state.timeout);

    this.setState({
      timeout: setTimeout(() => this.setState({ alert: "" }), ALERT_TIMEOUT),
    });

    return this.setState({
      alert: <Alert type={type} text={text} close={this.close} />,
    });
  };

  // Auxiliary functions
  filterNotifications(response, body) {
    if (response == "success") {
      let temp = [];
      for (let z = 0; z < body.length; z++) {
        temp.push(body[z]);
      }

      if (!temp.length) {
        this.setState({ filtered_notifications: temp });
        return this.buildAlert("attention", NO_ITEM_MESSAGE);
      }

      return this.setState({ filtered_notifications: temp });
    }

    this.setState({ filtered_notifications: [] });
    if (body == NO_ITEMS_ERROR) {
      return this.buildAlert("attention", NO_ITEM_MESSAGE);
    }
  }

  setCard() {
    let rows = this.state.filtered_notifications;

    if (rows.length < 1 || !rows) {
      return (
        <span
          className="global-body-text"
          style={{ marginBottom: "0px", marginTop: "20px" }}
        >
          Actualmente no hay préstamos con los filtros seleccionados.
        </span>
      );
    }

    let notificationzone = [];
    for (let i = 0; i < rows.length; i++) {
      for (let j = 0; j < rows[i].length; j++) {
        let obj = rows[i][j];
        notificationzone.push(
          <div class="wrapper">
            <div class="clash-card barbarian">
              <div class="clash-card__level clash-card__level--barbarian">
                PROMEDIO DE VARIABLE
              </div>
              <div class="clash-card__unit-name">
                {obj["type"].toUpperCase()}
              </div>
              <div class="clash-card__unit-date">
                {formatDateToLocal(obj["date"])}
              </div>
              <div class="clash-card__unit-description">
                El índice de calidad del aire (ICA) es una cifra que
                proporcionan las autoridades de una zona, y que refleja las
                cantidades de contaminantes presentes en el aire.
              </div>

              <div class="clash-card__unit-stats clash-card__unit-stats--barbarian clearfix">
                <div class="one-third">
                  <div class="stat">{obj["zone"]}</div>
                  <div class="stat-value">ZONA</div>
                </div>

                <div class="one-third">
                  <div class="stat">{obj["ica"]}</div>
                  <div class="stat-value">ICA</div>
                </div>
                <div class="one-third no-border">
                  <div class="stat">{obj["description"]}</div>
                  <div class="stat-value">Descripción</div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    return notificationzone;
  }

  render() {
    let table = this.setCard();

    return (
      <div className="cu-container">
        {this.state.alert}
        <span className="global-comp-title">Registros</span>
        <span className="global-comp-description">
          Aquí podrá ver el promedio de cada variable. utilice la lista
          desplegables para filtrar las alertas por zona.
        </span>
        <div className="global-comp-form-card-container">
          <span className="global-comp-sub-title">ALERTAS</span>
          <div className="global-special-form-group">
            <select
              id="zones"
              className="global-special-form-input-select"
              value={this.state.zones}
              onChange={this.handleChange}
            >
              <option value="">Seleccione una zona...</option>
              {setSelectOptions(ZONES)}
            </select>
          </div>
          {table}
        </div>
      </div>
    );
  }
}

export default ListNotifications;
