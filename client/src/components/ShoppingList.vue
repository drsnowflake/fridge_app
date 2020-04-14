<template>
	<div>
		<div></div>
		<!-- Tab links -->
		<div class="tab">
			<button class="tablinks active" @click="openTab($event, 'shopping_list')">
				Shopping List
			</button>
			<button class="tablinks" @click="openTab($event, 'nutrition_info')">
				Nutrition Info
			</button>
		</div>

		<!-- Tab content -->
		<div id="shopping_list" class="tabcontent">
			<div v-if="!selectedRecipe">
				<p>Please search for and select a recipe to see a shopping list</p>
			</div>
			<div v-if="selectedRecipe" id="checkboxes">
				<h3>Shopping List</h3>
				<ul>
					<li
						v-for="ingredient in selectedRecipe.ingredientLines"
						:ingredient="ingredient"
						:key="ingredient"
						@click="$event.target.classList.toggle('highlight')"
					>
						{{ ingredient }}
					</li>
				</ul>
			</div>
		</div>

		<div id="nutrition_info" class="tabcontent">
			<div v-if="!selectedRecipe">
				<p>
					Please search for and select a recipe to see the nutritional
					information
				</p>
			</div>
			<div v-if="selectedRecipe">
				<h3>Nutrition Info</h3>
				<section class="performance-facts" id="performance-facts">
					<div class="performance-facts__header"></div>
					<table class="performance-facts__table">
						<thead>
							<tr>
								<th colspan="3" class="amps">Amount Per Serving</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th colspan="2" id="lkcal-val-cal"><b>Calories</b></th>
								<td class="nob">
									{{
										Math.round(selectedRecipe.calories / selectedRecipe.yield)
									}}
								</td>
							</tr>
							<tr class="thick-row">
								<td colspan="3" class="small-info"><b>% Daily Value*</b></td>
							</tr>
							<tr>
								<th colspan="2">
									<b>Total Fat</b>
									{{
										Math.round(
											(selectedRecipe.totalNutrients.FAT.quantity /
												selectedRecipe.yield) *
												10
										) / 10
									}}
									g
								</th>
								<td>
									<b>
										{{
											Math.round(
												selectedRecipe.totalDaily.FAT.quantity /
													selectedRecipe.yield
											)
										}}
										%
									</b>
								</td>
							</tr>
							<tr>
								<td class="blank-cell"></td>
								<th>
									Saturated Fat
									{{
										Math.round(
											(selectedRecipe.totalNutrients.FASAT.quantity /
												selectedRecipe.yield) *
												10
										) / 10
									}}
									g
								</th>
								<td>
									<b>
										{{
											Math.round(
												selectedRecipe.totalDaily.FASAT.quantity /
													selectedRecipe.yield
											)
										}}
										%
									</b>
								</td>
							</tr>
							<tr>
								<td class="blank-cell"></td>
								<th>
									Trans Fat
									{{
										Math.round(
											(selectedRecipe.totalNutrients.FATRN.quantity /
												selectedRecipe.yield) *
												10
										) / 10
									}}
								</th>
								<td></td>
							</tr>
							<tr>
								<th colspan="2">
									<b>Cholesterol</b>
									{{
										Math.round(
											(selectedRecipe.totalNutrients.CHOLE.quantity /
												selectedRecipe.yield) *
												10
										) / 10
									}}
									mg
								</th>
								<td>
									<b>
										{{
											Math.round(
												selectedRecipe.totalDaily.CHOLE.quantity /
													selectedRecipe.yield
											)
										}}
										%
									</b>
								</td>
							</tr>
							<tr>
								<th colspan="2">
									<b>Sodium</b>
									{{
										Math.round(
											(selectedRecipe.totalNutrients.NA.quantity /
												selectedRecipe.yield) *
												10
										) / 10
									}}
									mg
								</th>
								<td>
									<b>
										{{
											Math.round(
												selectedRecipe.totalDaily.NA.quantity /
													selectedRecipe.yield
											)
										}}
										%
									</b>
								</td>
							</tr>
							<tr>
								<th colspan="2">
									<b>Total Carbohydrate</b>
									{{
										Math.round(
											(selectedRecipe.totalNutrients.CHOCDF.quantity /
												selectedRecipe.yield) *
												10
										) / 10
									}}
									g
								</th>
								<td>
									<b>
										{{
											Math.round(
												selectedRecipe.totalDaily.CHOCDF.quantity /
													selectedRecipe.yield
											)
										}}
										%
									</b>
								</td>
							</tr>
							<tr>
								<td class="blank-cell"></td>
								<th>
									Dietary Fiber
									{{
										Math.round(
											(selectedRecipe.totalNutrients.FIBTG.quantity /
												selectedRecipe.yield) *
												10
										) / 10
									}}
									g
								</th>
								<td>
									<b>
										{{
											Math.round(
												selectedRecipe.totalDaily.FIBTG.quantity /
													selectedRecipe.yield
											)
										}}
										%
									</b>
								</td>
							</tr>
							<tr>
								<td class="blank-cell"></td>
								<th>
									Total Sugars
									{{
										Math.round(
											(selectedRecipe.totalNutrients.SUGAR.quantity /
												selectedRecipe.yield) *
												10
										) / 10
									}}
									g
								</th>
								<td></td>
							</tr>
							<tr class="thick-end">
								<th colspan="2">
									<b>Protein</b>
									{{
										Math.round(
											(selectedRecipe.totalNutrients.PROCNT.quantity /
												selectedRecipe.yield) *
												10
										) / 10
									}}
									g
								</th>
								<td>
									<b>
										{{
											Math.round(
												selectedRecipe.totalDaily.PROCNT.quantity /
													selectedRecipe.yield
											)
										}}
										%
									</b>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="performance-facts__table--grid">
						<tbody>
							<tr>
								<th>
									Vitamin D
									{{
										Math.round(
											(selectedRecipe.totalNutrients.VITD.quantity /
												selectedRecipe.yield) *
												10
										) / 10
									}}
									µg
								</th>
								<td>
									<b>
										{{
											Math.round(
												selectedRecipe.totalDaily.VITD.quantity /
													selectedRecipe.yield
											)
										}}
										%
									</b>
								</td>
							</tr>
							<tr>
								<th>
									Calcium
									{{
										Math.round(
											(selectedRecipe.totalNutrients.CA.quantity /
												selectedRecipe.yield) *
												10
										) / 10
									}}
									mg
								</th>
								<td>
									<b>
										{{
											Math.round(
												selectedRecipe.totalDaily.CA.quantity /
													selectedRecipe.yield
											)
										}}
										%
									</b>
								</td>
							</tr>
							<tr>
								<th>
									Iron
									{{
										Math.round(
											(selectedRecipe.totalNutrients.FE.quantity /
												selectedRecipe.yield) *
												10
										) / 10
									}}
									mg
								</th>
								<td>
									<b>
										{{
											Math.round(
												selectedRecipe.totalDaily.FE.quantity /
													selectedRecipe.yield
											)
										}}
										%
									</b>
								</td>
							</tr>
							<tr class="thin-end">
								<th>
									Potassium
									{{
										Math.round(
											(selectedRecipe.totalNutrients.K.quantity /
												selectedRecipe.yield) *
												10
										) / 10
									}}
									mg
								</th>
								<td>
									<b>
										{{
											Math.round(
												selectedRecipe.totalDaily.K.quantity /
													selectedRecipe.yield
											)
										}}
										%
									</b>
								</td>
							</tr>
						</tbody>
					</table>
					<p class="small-info" id="small-nutrition-info">
						*Percent Daily Values are based on a 2000 calorie diet
					</p>
				</section>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'shopping-list',
	props: ['selectedRecipe'],
	data() {
		return {
			pageload: ''
		};
	},
	mounted() {
		this.openTab(this.pageLoad, 'shopping_list');
	},
	methods: {
		openTab: function(evt, tabName) {
			// Declare all variables
			var i, tabcontent, tablinks;

			// Get all elements with class="tabcontent" and hide them
			tabcontent = document.getElementsByClassName('tabcontent');
			for (i = 0; i < tabcontent.length; i++) {
				tabcontent[i].style.display = 'none';
			}

			// Get all elements with class="tablinks" and remove the class "active"
			tablinks = document.getElementsByClassName('tablinks');
			for (i = 0; i < tablinks.length; i++) {
				tablinks[i].className = tablinks[i].className.replace(' active', '');
			}

			// Show the current tab, and add an "active" class to the button that opened the tab
			document.getElementById(tabName).style.display = 'block';
			evt.currentTarget.className += ' active';
		}
	}
};
</script>

<style scoped>
/* Style the tab */
.tab {
	overflow: hidden;
	border: 1px solid #ccc;
	background-color: #f1f1f1;
}

/* Style the buttons that are used to open the tab content */
.tab button {
	background-color: inherit;
	float: left;
	border: none;
	outline: none;
	cursor: pointer;
	padding: 14px 16px;
	transition: 0.3s;
	width: 50%;
}

/* Change background color of buttons on hover */
.tab button:hover {
	background-color: #ddd;
}

/* Create an active/current tablink class */
.tab button.active {
	background-color: #ccc;
}

/* Style the tab content */
.tabcontent {
	display: none;
	padding: 6px 10px;
	border-top: none;
}

h3 {
	margin: 5px 0px;
}
ul {
	padding: 0;
}

li {
	list-style: none;
	padding-bottom: 2px;
}

/* Nutrition CSS */
.calc.calcres {
	text-align: center;
	font-size: 20px;
	background-color: #c8c9c5;
	color: #c8c9c5;
	display: none;
}
.calcres a#recipeLicensing {
	margin-top: 20px;
}

.performance-facts {
	border: 1px solid black;
	margin: 20px auto;
	width: 280px;
	padding: 0.5rem;
	color: #000;
	font-family: Roboto;
	background-color: #fff1f1;
}
.performance-facts table {
	border-collapse: unset;
	border-spacing: 0;
}

.performance-facts__title {
	font-weight: bold;
	font-size: 38px;
	margin: 0 0 0.25rem 0;
}

.performance-facts__header {
	border-bottom: 10px solid black;
	padding: 0 0 0.25rem 0;
	margin: 0 0 0.5rem 0;
}
.performance-facts__header p {
	margin: 0;
	font-size: 18px;
	display: none;
}

.performance-facts__table,
.performance-facts__table--small,
.performance-facts__table--grid {
	width: 100%;
}
.performance-facts__table thead tr th,
.performance-facts__table--small thead tr th,
.performance-facts__table--grid thead tr th,
.performance-facts__table thead tr td,
.performance-facts__table--small thead tr td,
.performance-facts__table--grid thead tr td {
	border: 0;
}
.performance-facts__table th,
.performance-facts__table--small th,
.performance-facts__table--grid th,
.performance-facts__table td,
.performance-facts__table--small td,
.performance-facts__table--grid td {
	font-weight: normal;
	text-align: left;
	padding: 0.25rem 0;
	border-top: 1px solid black;
}
.performance-facts__table td:last-child,
.performance-facts__table--small td:last-child,
.performance-facts__table--grid td:last-child {
	text-align: right;
}
.performance-facts__table .blank-cell,
.performance-facts__table--small .blank-cell,
.performance-facts__table--grid .blank-cell {
	width: 1rem;
	border-top: 0;
}
.performance-facts__table .thick-row th,
.performance-facts__table--small .thick-row th,
.performance-facts__table--grid .thick-row th,
.performance-facts__table .thick-row td,
.performance-facts__table--small .thick-row td,
.performance-facts__table--grid .thick-row td {
	border-top-width: 5px;
}

.small-info {
	font-size: 11px;
}

.performance-facts__table--small {
	border-bottom: 1px solid #999;
	margin: 0 0 0.5rem 0;
}
.performance-facts__table--small thead tr {
	border-bottom: 1px solid black;
}
.performance-facts__table--small td:last-child {
	text-align: left;
}
.performance-facts__table--small th,
.performance-facts__table--small td {
	border: 0;
	padding: 0;
}

.performance-facts__table--grid {
	margin: 0 0 0.5rem 0;
}
.performance-facts__table--grid td:last-child {
	text-align: right;
}
.performance-facts__table--grid td:last-child::before {
	font-weight: bold;
	margin: 0 0.25rem 0 0;
}
.performance-facts__table #lkcal-val {
	font-size: 35px;
	font-weight: bold;
	font-family: Roboto;
	border: 0 none;
}
.performance-facts__table #lkcal-val-cal {
	font-size: 35px;
	border: 0 none !important;
}
.performance-facts__table .amps {
	font-size: 16px;
	font-weight: bold !important;
	margin: 0 -200px -10px 0 !important;
	display: block;
}
.performance-facts__table .nob {
	border: 0 none !important;
}
.pwb {
	float: right;
}
.label-bottom {
	padding: 15px 0;
	width: 280px;
	margin: 0 auto;
	font-size: 13px;
}
.performance-facts-recipe-title {
	font-size: 18px;
	padding: 10px 0;
}

.highlight {
	text-decoration: line-through;
	color: grey;
}

li:hover {
	cursor: pointer;
	color: lightcoral;
}
</style>
