import { Component } from "react";

import AppInfo from "../app-info/app-info";
import SearchPanel from "../search-panel/search-panel";
import AppFilter from "../app-filter/app-filter";
import EmployeesList from "../employees-list/employees-list";
import EmployeesAddForm from "../employees-add-form/employees-add-form";

import "./app.css";

/**
 * Приложение
 * @returns {ReactElement}
 */
class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: [
				{ name: "John Smith", salary: 800, increase: true, like: false, id: 1 },
				{ name: "John Uik", salary: 3000, increase: false, like: true, id: 2 },
				{
					name: "Alex Truman",
					salary: 5000,
					increase: false,
					like: false,
					id: 3,
				},
			],
			term: "",
			filter: "all",
		};

		this.maxId = 4;
	}

	/**
	 * Удаляет из списка данные о сотруднике
	 * @param id {Number} Идентификатор сотрудника
	 */
	deleteItem = id => {
		this.setState(({ data }) => {
			return {
				data: data.filter(item => item.id !== id),
			};
		});
	};

	/**
	 * Добавляет данные о сотруднике в список
	 * @param name {String} Имя сотрудника
	 * @param salary {Number} Размер заработной платы сотрудника
	 */
	addItems = (name, salary) => {
		const newItem = {
			name,
			salary,
			increase: false,
			like: false,
			id: this.maxId++,
		};

		this.setState(({ data }) => {
			const newArr = [...data, newItem];

			return {
				data: newArr,
			};
		});
	};

	/**
	 * Изменяет данные о сотруднике с учетом переданных props
	 * @param id {Number} Идентификатор сотрудника
	 * @param prop {String}
	 */
	onToggleProp = (id, prop) => {
		this.setState(({ data }) => ({
			data: data.map(item => {
				if (item.id === id) {
					return { ...item, [prop]: !item[prop] };
				}

				return item;
			}),
		}));
	};

	/**
	 * Поиск сотрудника
	 * @param items {Object} Массив данных сотрудников
	 * @param term {String} Данные из строки поиска
	 * @returns Возвращает сотрудника(-ов) подходящих под условие поиска
	 */
	searchEmp = (items, term) => {
		if (term.length === 0) {
			return items;
		}

		return items.filter(item => {
			return item.name.indexOf(term) > -1;
		});
	};

	/**
	 * Обновляет состояние компонента search-panel
	 * @param {String} Данные из строки поиска
	 */
	onUpdateSearch = term => {
		this.setState({
			term: term,
		});
	};

	/**
	 * Фильтрация сотрудников (кнопки)
	 * @param items {Object} Массив данных сотрудников
	 * @param filter {String} Название фильтра
	 * @returns Возвращает сотрудника(-ов) подходящих под условие фильтрации
	 */
	filterPost = (items, filter) => {
		switch (filter) {
			case "like":
				return items.filter(item => item.like);
			case "moreThen1000":
				return items.filter(item => item.salary > 1000);
			default:
				return items;
		}
	};

	/**
	 * Обновляет состояние компонента app-filter
	 * @param filter {String}
	 */
	onFilterSelect = filter => {
		this.setState({
			filter: filter,
		});
	};

	/**
	 * Обновляет состояние в компоненте employees-list-item
	 * @param id {Number} Идентификатор сотрудника
	 * @param salary {Number} Размер заработной платы сотрудника
	 */
	onUpdateValue = (id, newSalary) => {
		this.setState(({ data }) => ({
			data: data.map(item => {
				if (item.id === id) {
					return { ...item, salary: newSalary };
				}

				return item;
			}),
		}));
	};

	render() {
		const { data, term, filter } = this.state;

		const employees = this.state.data.length;
		const increased = this.state.data.filter(item => item.increase).length;
		const visibleData = this.filterPost(this.searchEmp(data, term), filter);

		return (
			<div className='app'>
				<AppInfo
					employees={employees}
					increased={increased}
				/>

				<div className='search-panel'>
					<SearchPanel onUpdateSearch={this.onUpdateSearch} />
					<AppFilter
						filter={this.state.filter}
						onFilterSelect={this.onFilterSelect}
					/>
				</div>

				<EmployeesList
					data={visibleData}
					onDelete={this.deleteItem}
					onToggleProp={this.onToggleProp}
					onUpdateValue={this.onUpdateValue}
				/>
				<EmployeesAddForm onAdd={this.addItems} />
			</div>
		);
	}
}

export default App;
