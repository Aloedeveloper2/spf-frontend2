<template>
    <v-row class="fill-height">
        <v-col>
            <v-sheet height="64">
                <v-toolbar flat>
                    <v-btn
                        outlined
                        class="mr-4"
                        color="grey darken-2"
                        @click="setToday"
                    >
                        Aujourd'hui
                    </v-btn>
                    <v-btn fab text small color="grey darken-2" @click="prev">
                        <v-icon small> mdi-chevron-left </v-icon>
                    </v-btn>
                    <v-btn fab text small color="grey darken-2" @click="next">
                        <v-icon small> mdi-chevron-right </v-icon>
                    </v-btn>
                    <v-toolbar-title v-if="$refs.calendar">
                        {{ $refs.calendar.title }}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <CalendarNewEvent />
                    <v-menu bottom right>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                outlined
                                color="grey darken-2"
                                v-bind="attrs"
                                v-on="on"
                            >
                                <span>{{ typeToLabel[type] }}</span>
                                <v-icon right> mdi-menu-down </v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item @click="type = 'day'">
                                <v-list-item-title>Jour</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="type = 'week'">
                                <v-list-item-title>Semaine</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="type = 'month'">
                                <v-list-item-title>Mois</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-toolbar>
            </v-sheet>
            <v-sheet height="600">
                <v-calendar
                    ref="calendar"
                    v-model="focus"
                    color="primary"
                    :events="events"
                    :event-color="getEventColor"
                    :type="type"
                    @click:event="showEvent"
                    @click:more="viewDay"
                    @click:date="viewDay"
                    @change="updateRange"
                ></v-calendar>
                <v-menu
                    v-model="selectedOpen"
                    :close-on-content-click="false"
                    :activator="selectedElement"
                    offset-x
                >
                    <v-card color="grey lighten-4" min-width="350px" flat>
                        <v-toolbar :color="selectedEvent.color" dark>
                            <v-btn icon @click="deleteEvent(selectedEvent)">
                                <v-icon>mdi-delete</v-icon>
                            </v-btn>
                            <v-toolbar-title
                                v-html="selectedEvent.name"
                            ></v-toolbar-title>
                            <v-spacer></v-spacer>
                            <v-menu v-model="uploadDialog" :nudge-width="200" offset-x :close-on-content-click="false">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn dark v-bind="attrs" v-on="on" icon>
                                        <v-icon>mdi-file-music</v-icon>
                                    </v-btn>
                                </template>
                                <v-card>
                                    <v-card-text>
                                        <v-file-input
                                            label="Fichier audio"                                            
                                            outlined
                                            accept=".mp3"
                                            dense
                                            prepend-inner-icon="mdi-file-music"
                                            prepend-icon=""
                                            v-model="audioFile"
                                        ></v-file-input>
                                        <v-btn block color="primary" @click="uploadFile(selectedEvent._id)"><v-icon left>mdi-upload</v-icon> Envoyer</v-btn>
                                    </v-card-text>
                                </v-card>
                            </v-menu>
                        </v-toolbar>
                        <v-card-text>
                            <p>
                                <audio src="" controls></audio>
                            </p>
                            <span v-html="selectedEvent.details"></span>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                text
                                color="error"
                                @click="selectedOpen = false"
                            >
                                Fermer
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-menu>
            </v-sheet>
        </v-col>
        <LoadingDialog
            :loading="loading"
            message="Chargement des rendez-vous"
        />
        <Notification :notification="alert" :message="messageNotification" />
    </v-row>
</template>

<script>
import axios from "axios";
import server from "../config/address";
import CalendarNewEvent from "./Calendar-new-event.vue";
import LoadingDialog from "./Loader.vue";
import Notification from "./Notification.vue";
export default {
    data: () => ({
        uploadDialog: false,
        audioFile: null,
        messageNotification: "",
        alert: false,
        loading: false,
        focus: "",
        type: "month",
        typeToLabel: {
            month: "Mois",
            week: "Semaine",
            day: "Jour",
        },
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        events: [],
    }),
    components: { CalendarNewEvent, LoadingDialog, Notification },
    mounted() {
        this.$refs.calendar.checkChange();
    },
    methods: {
        uploadFile(eventId){
            let formData = new FormData();
            formData.append("audio", this.audioFile);
            this.loading = true;
            axios.put(`${server.address}/events/${this.$route.params.id}/${eventId}`, formData).then(resp=>{
                console.log(resp);
                this.loading = false;
                this.uploadDialog = false;
            }).catch(err=>{
                console.log(err);
                this.loading = false;
                this.uploadDialog = false;
            })
        },
        viewDay({ date }) {
            this.focus = date;
            this.type = "day";
        },
        getEventColor(event) {
            return event.color;
        },
        setToday() {
            this.focus = "";
        },
        prev() {
            this.$refs.calendar.prev();
        },
        next() {
            this.$refs.calendar.next();
        },
        showEvent({ nativeEvent, event }) {
            const open = () => {
                this.selectedEvent = event;
                this.selectedElement = nativeEvent.target;
                requestAnimationFrame(() =>
                    requestAnimationFrame(() => (this.selectedOpen = true))
                );
            };

            if (this.selectedOpen) {
                this.selectedOpen = false;
                requestAnimationFrame(() =>
                    requestAnimationFrame(() => open())
                );
            } else {
                open();
            }

            nativeEvent.stopPropagation();
        },
        updateRange() {
            // get all events
            this.loading = true;
            axios
                .get(`${server.address}/events/${this.$route.params.id}`)
                .then((response) => {
                    this.events = response.data[0];
                    this.loading = false;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        deleteEvent(event) {
            this.loading = true;
            axios
                .delete(
                    `${server.address}/events/${this.$route.params.id}/${event._id}`
                )
                .then((response) => {
                    let eventIndex = this.events.indexOf(event);
                    this.events.splice(eventIndex, 1);
                    this.loading = false;
                    this.alert = true;
                    this.messageNotification = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>

<style></style>
