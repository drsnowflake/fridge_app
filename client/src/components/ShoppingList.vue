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
				<p>Please select a recipe fool</p>
			</div>
			<div v-if="selectedRecipe" id="checkboxes">
				<h3>Shopping List</h3>
				<ul>
					<li
						v-for="(ingredient, index) in selectedRecipe.ingredientLines"
						:ingredient="ingredient"
						:key="index"
					>
						<input type="checkbox" />
						{{ ingredient }}
					</li>
				</ul>
			</div>
		</div>

		<div id="nutrition_info" class="tabcontent">
			<h3>Nutrition Info</h3>
			<p>Paris is the capital of France.</p>
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

<style>
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
	padding: 6px 12px;
	border: 1px solid #ccc;
	border-top: none;
}

.checkboxes {
}
</style>
