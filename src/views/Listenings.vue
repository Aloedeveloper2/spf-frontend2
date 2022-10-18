<template>
	<section>
		<!-- dialog upload end -->
		<LoadingDialog :loading="loading" message="Envoi des informations" />
		<floating-alert
			:message="alertMessage"
			:show="alertShow"
			:type="alertColor"
		></floating-alert>
		<v-data-table
			:headers="headers"
			:items="listenings"
			sort-by="name"
			:search="search"
			single-expand
			:expanded.sync="expanded"
			item-key="id"
			show-expand
			:loading="loadingTable"
			loading-text="Chargement... Veuillez patienter"
		>
			<template v-slot:expanded-item="{ headers, item }">
				<td :colspan="headers.length">
					<audio
						:src="`${server.address}/listening/audio/${item.filePath}`"
						controls
					></audio>
				</td>
			</template>
			<template v-slot:top>
				<v-toolbar flat>
					<v-toolbar-title>Ecoutes</v-toolbar-title>
					<v-divider class="mx-4" inset vertical></v-divider>
					<v-spacer></v-spacer>
					<v-text-field
						v-model="search"
						append-icon="mdi-magnify"
						label="Rechercher"
						single-line
						hide-details
					></v-text-field>
					<v-spacer></v-spacer>
					<!-- user form start -->
					<v-dialog v-model="dialog" max-width="500px" scrollable>
						<template v-slot:activator="{ on, attrs }">
							<v-btn
								color="primary"
								dark
								class="mb-2"
								v-bind="attrs"
								v-on="on"
							>
								Nouveau
							</v-btn>
						</template>
						<v-card>
							<v-card-title>
								<span class="text-h5">Nouvelle écoute</span>
							</v-card-title>

							<v-card-text>
								<v-container>
									<v-row>
										<v-col cols="12">
											<v-text-field
												dense
												outlined
												v-model="editedItem.post"
												label="Poste"
											></v-text-field>
										</v-col>
									</v-row>
									<v-row>
										<v-col cols="auto" sm="12">
											<v-textarea
												v-model="editedItem.observation"
												outlined
												rows="3"
												name="input-7-4"
												label="Observation"
											></v-textarea>
										</v-col>
									</v-row>
								</v-container>
							</v-card-text>

							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn color="red darken-1" text @click="close">
									Annuler
								</v-btn>
								<v-btn color="blue darken-1" text @click="save">
									Enregistrer
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-dialog>
					<!-- user form end -->

					<!-- dialog delete start -->
					<v-dialog v-model="dialogDelete" max-width="500px">
						<v-card>
							<v-card-title class="text-h5"
								>Veuillez-confirmer votre
								opération</v-card-title
							>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn
									color="red darken-1"
									text
									@click="closeDelete"
									>Annuler</v-btn
								>
								<v-btn
									color="blue darken-1"
									text
									@click="deleteItemConfirm"
									>Confirmer</v-btn
								>
								<v-spacer></v-spacer>
							</v-card-actions>
						</v-card>
					</v-dialog>
					<!-- dialog delete end -->
					<!-- dialog upload start -->
					<v-dialog v-model="dialogUpload" max-width="500px">
						<v-card>
							<v-card-title>
								Insérez le fichier audio
							</v-card-title>
							<v-card-text>
								<v-file-input
									label="Fichier audio"
									outlined
									dense
									@change="handleFileUpload($event)"
								>
									<template v-slot:selection="{ text }">
										<v-chip small label color="primary">
											{{ text }}
										</v-chip>
									</template>
								</v-file-input>
							</v-card-text>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn
									color="red darken-1"
									text
									@click="dialogUpload = false"
									>Annuler</v-btn
								>
								<v-btn
									color="blue darken-1"
									text
									@click="uploadConfirm"
									>Confirmer</v-btn
								>
								<v-spacer></v-spacer>
							</v-card-actions>
						</v-card>
					</v-dialog>
				</v-toolbar>
			</template>
			<template v-slot:[`item.actions`]="{ item }">
				<v-icon class="mr-2" @click="getListeningId(item)">
					mdi-book-music
				</v-icon>
				<v-icon @click="deleteItem(item)"> mdi-delete </v-icon>
			</template>
			<template v-slot:no-data>
				<v-btn color="primary" @click="initialize"> Actualiser </v-btn>
			</template>
		</v-data-table>
	</section>
</template>

<script>
import axios from "axios";
import server from "../config/address";
import LoadingDialog from "../components/Loader.vue";
import FloatingAlert from "../components/FloatingAlert.vue";
export default {
	data: () => ({
		server,
		expanded: [],
		loading: false,
		dialog: false,
		dialogDelete: false,
		dialogUpload: false,
		file: "",
		listeningId: null,
		loadingTable: true,
		search: "",
		alertMessage: "",
		alertShow: false,
		alertColor: "",
		headers: [
			{ text: "Téléconseillé", value: "post" },
			{ text: "Observations", value: "observation" },
			{ text: "Date d'ajout", value: "created_at" },
			{ text: "Actions", value: "actions", sortable: false },
		],
		listenings: [],
		editedIndex: -1,
		editedItem: {
			post: "",
			observation: "",
		},
		defaultItem: {
			post: "",
			observation: "",
		},
	}),
	components: { LoadingDialog, FloatingAlert },
	watch: {
		dialog(val) {
			val || this.close();
		},
		dialogDelete(val) {
			val || this.closeDelete();
		},
	},

	created() {
		this.initialize();
	},

	methods: {
		initialize() {
            this.loadingTable = true;
			axios
				.get(`${server.address}/listening`)
				.then((response) => {
					this.listenings = response.data;
					this.loadingTable = false;
				})
				.catch((error) => {
					console.log(error);
				});
		},

		deleteItem(item) {
			this.editedIndex = this.listenings.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialogDelete = true;
		},

		deleteItemConfirm() {
			this.loading = true;
			this.alertShow = false;
			axios
				.delete(`${server.address}/listening/${this.editedItem.id}`)
				.then((response) => {
					this.alertMessage = response.data;
					this.alertShow = true;
					this.alertColor = "green";
					this.loading = false;
                    this.dialogDelete = false;
                    this.initialize();
				})
				.catch((err) => {
					this.alertMessage = err.response.data;
					this.alertShow = true;
					this.alertColor = "red";
					this.loading = false;
				});
		},

		handleFileUpload(event) {
			this.file = event;
		},

		getListeningId(item) {
			this.dialogUpload = true;
			this.listeningId = item.id;
		},

		uploadConfirm() {
			let formData = new FormData();
			formData.append("audio", this.file);
			this.loading = true;
			axios
				.post(
					`${server.address}/listening/${this.listeningId}/file`,
					formData,
					{
						headers: {
							"Content-Type": "multipart/form-data",
						},
					}
				)
				.then((response) => {
					console.log(response);
					this.loading = false;
					this.dialogUpload = false;
					this.initialize();
				})
				.catch((error) => {
					console.log(error);
				});
		},

		close() {
			this.dialog = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},

		closeDelete() {
			this.dialogDelete = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},

		save() {
			this.loading = true;
			axios
				.post(`${server.address}/listening`, { data: this.editedItem })
				.then((response) => {
                    console.log(response);
					this.loading = false;
                    this.close();
					this.initialize();
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
};
</script>
