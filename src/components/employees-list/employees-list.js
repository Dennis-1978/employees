import { Component } from "react";

import EmployeesListItem from "../employees-list-item/employees-list-item";

import "./employees-list.css";

/**
 * Компонент списка сотрудников
 */
class EmployeesList extends Component {
	render() {
		const { data, onDelete, onToggleProp, onUpdateValue } = this.props;

		const elements = data.map(item => {
			const { id, ...itemProps } = item;

			return (
				<EmployeesListItem
					{...itemProps}
					key={id}
					onDelete={() => onDelete(id)}
					onToggleProp={event =>
						onToggleProp(id, event.currentTarget.getAttribute("data-toggle"))
					}
					onUpdateValue={event => onUpdateValue(id, event.target.value)}
				/>
			);
		});

		return <ul className='app-list app-group'>{elements}</ul>;
	}
}

export default EmployeesList;
