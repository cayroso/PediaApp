'use strict';

import { isArray } from "jquery";

const mixin = {
    data() {
        return {
            busy: false,
            enums: {
                orderStatuses: [
                    { id: 1, name: 'Requested' },
                    { id: 2, name: 'Placed' },
                    { id: 3, name: 'Accepted' },
                    { id: 4, name: 'Processed' },
                    { id: 5, name: 'Delivered' },
                    { id: 6, name: 'Completed' },
                    { id: 7, name: 'Cancelled' },
                ],
                promotionType: [
                    { id: 1, name: 'Discounts' },
                    { id: 2, name: 'Shipping' },
                ],
                promotionProductApplicability: [
                    { id: 1, name: 'All Products' },
                    { id: 2, name: 'Specific Products' },
                ],
                promotionOfferType: [
                    { id: 1, name: 'No Code' },
                    { id: 2, name: 'Generic Code' },
                ],

                shipmentType: [
                    { id: 1, name: 'Pickup' },
                    { id: 2, name: 'Delivery' },
                ]
            }
        };
    },
    async created() {
        //debugger;
    },
    mounted() {
        this.showHiddenElements();

    },
    methods: {
        scrollIntoView() {
            const topElem = document.getElementById('top');
            if (topElem) {
                topElem.scrollIntoView({ behavior: 'smooth' });
                //debugger
            }
        },

        showHiddenElements() {
            let vm = this;

            if (!vm.$el.getElementsByClassName)
                return;

            let elems = vm.$el.getElementsByClassName('initialHidden');

            for (let i = 0; i < elems.length; i++) {
                let el = elems[i];

                el.classList.remove('invisible');
                el.classList.remove('d-none');
            }

        },
        close() {
            //const vm = this;

            //const href = atob(vm.rurl) || vm.durl;
            //vm.$util.href(href);
            const referrer = document.referrer.toLowerCase();

            if (referrer && referrer.includes('/identity/account/login')) {
                history.go(-2);
            }
            else {
                history.back();
            }
        },

        toggle(key) {
            const vm = this;

            vm.toggles[key] = !vm.toggles[key];

            localStorage.setItem(vm.togglesKey, JSON.stringify(vm.toggles));
        },

        getBusinessHours(businessHours) {
            //const vm = this;
            //const clinic = vm.item.clinic;
            //const businessHours = clinic.businessHours;

            if (!isArray(businessHours) || businessHours.length === 0)
                return '';

            const output = [];

            const weekDays = [
                "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
            ]

            businessHours.forEach(br => {
                var daysOfWeek = br.daysOfWeek.split(',');

                const wds = daysOfWeek.map(dw => {
                    var wd = weekDays[dw];

                    return wd;

                })

                var xx = `${wds.join('-')} ${moment(br.startTime, 'HH:mm').format('h:mm A')}-${moment(br.endTime, 'HH:mm').format('h:mm A')}`;
                output.push(xx);

                //output.push(daysOfWeek);
            })

            return output;
        },
    }
};

export default mixin;