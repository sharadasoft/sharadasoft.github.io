    'use strict';
    app.factory("playStationService", [
        function() {
            return {
                getSystems: function() {
                    return JSON.parse(localStorage.getItem("sys"));
                },
                setSystems: function() {
                    localStorage.setItem("sys", JSON.stringify([{
                        systemNumber: 1,
                        customer: {
                            name: null,
                            disable: false
                        },
                        members: {
                            count: 1,
                            disable: false
                        },
                        duration: {
                            hours: 1,
                            disable: false
                        },
                        startBtn: {
                            disable: true,
                            show: true
                        },
                        continueBtn: {
                            disable: true,
                            show: false
                        },
                        editBtn: {
                            disable: true,
                            show: false
                        },
                        stopBtn: {
                            disable: true,
                            show: false
                        },
                        cancelBtn: {
                            disable: true,
                            show: false
                        }, 
                        updateBtn: {
                            disable: true,
                            show: false
                        },

                        invoiceDetails: [],
                        startTime: {
                            value: null,
                            show: false
                        },
                        endTime: {
                            value: null,
                            show: false
                        },
                        timeStamp: null,
                        amount: null,
                        status: false,
                        editMode: false,
                        cancelGameBtn: {
                            disable: true,
                            show: false
                        },
                        timeFinish: false,
                        editStartTimePanel: {
                            disable: true, show: false
                        }
                    }, {
                        systemNumber: 2,
                        customer: {
                            name: null,
                            disable: false
                        },
                        members: {
                            count: 1,
                            disable: false
                        },
                        duration: {
                            hours: 1,
                            disable: false
                        },
                        startBtn: {
                            disable: true,
                            show: true
                        },
                        continueBtn: {
                            disable: true,
                            show: false
                        },
                        editBtn: {
                            disable: true,
                            show: false
                        },
                        stopBtn: {
                            disable: true,
                            show: false
                        },
                        cancelBtn: {
                            disable: true,
                            show: false
                        }, updateBtn: {
                            disable: true,
                            show: false
                        },

                        invoiceDetails: [],
                        startTime: {
                            value: null
                        },
                        endTime: {
                            value: null
                        },
                        timeStamp: null,
                        amount: null,
                        status: false,
                        editMode: false,
                        cancelGameBtn: {
                            disable: true,
                            show: false
                        },
                        timeFinish: false,
                        editStartTimePanel: {
                            disable: true, 
                            show: false
                        }
                    }, {
                        systemNumber: 3,
                        customer: {
                            name: null,
                            disable: false
                        },
                        members: {
                            count: 1,
                            disable: false
                        },
                        duration: {
                            hours: 1,
                            disable: false
                        },
                        startBtn: {
                            disable: true,
                            show: true
                        },
                        continueBtn: {
                            disable: true,
                            show: false
                        },
                        editBtn: {
                            disable: true,
                            show: false
                        },
                        stopBtn: {
                            disable: true,
                            show: false
                        },
                        cancelBtn: {
                            disable: true,
                            show: false
                        }, updateBtn: {
                            disable: true,
                            show: false
                        },

                        invoiceDetails: [],
                        startTime: {
                            value: null,
                            show: false
                        },
                        endTime: {
                            value: null,
                            show: false
                        },
                        timeStamp: null,
                        amount: null,
                        status: false,
                        editMode: false,
                        cancelGameBtn: {
                            disable: true,
                            show: false
                        },
                        timeFinish: false,
                        editStartTimePanel: {
                            disable: true, show: false
                        }
                    }, {
                        systemNumber: 4,
                        customer: {
                            name: null,
                            disable: false
                        },
                        members: {
                            count: 1,
                            disable: false
                        },
                        duration: {
                            hours: 1,
                            disable: false
                        },
                        startBtn: {
                            disable: true,
                            show: true
                        },
                        continueBtn: {
                            disable: true,
                            show: false
                        },
                        editBtn: {
                            disable: true,
                            show: false
                        },
                        stopBtn: {
                            disable: true,
                            show: false
                        },
                        cancelBtn: {
                            disable: true,
                            show: false
                        }, updateBtn: {
                            disable: true,
                            show: false
                        },

                        invoiceDetails: [],
                        startTime: {
                            value: null,
                            show: false
                        },
                        endTime: {
                            value: null,
                            show: false
                        },
                        timeStamp: null,
                        amount: null,
                        status: false,
                        editMode: false,
                        cancelGameBtn: {
                            disable: true,
                            show: false
                        },
                        timeFinish: false,
                        editStartTimePanel: {
                            disable: true, show: false
                        }
                    }, {
                        systemNumber: 5,
                        customer: {
                            name: null,
                            disable: false
                        },
                        members: {
                            count: 1,
                            disable: false
                        },
                        duration: {
                            hours: 1,
                            disable: false
                        },
                        startBtn: {
                            disable: true,
                            show: true
                        },
                        continueBtn: {
                            disable: true,
                            show: false
                        },
                        editBtn: {
                            disable: true,
                            show: false
                        },
                        stopBtn: {
                            disable: true,
                            show: false
                        },
                        cancelBtn: {
                            disable: true,
                            show: false
                        }, updateBtn: {
                            disable: true,
                            show: false
                        },

                        invoiceDetails: [],
                        startTime: {
                            value: null,
                            show: false
                        },
                        endTime: {
                            value: null,
                            show: false
                        },
                        timeStamp: null,
                        amount: null,
                        status: false,
                        editMode: false,
                        cancelGameBtn: {
                            disable: true,
                            show: false
                        },
                        timeFinish: false,
                        editStartTimePanel: {
                            disable: true, 
                            show: false
                        }
                    }, {
                        systemNumber: 6,
                        customer: {
                            name: null,
                            disable: false
                        },
                        members: {
                            count: 1,
                            disable: false
                        },
                        duration: {
                            hours: 1,
                            disable: false
                        },
                        startBtn: {
                            disable: true,
                            show: true
                        },
                        continueBtn: {
                            disable: true,
                            show: false
                        },
                        editBtn: {
                            disable: true,
                            show: false
                        },
                        stopBtn: {
                            disable: true,
                            show: false
                        },
                        cancelBtn: {
                            disable: true,
                            show: false
                        }, updateBtn: {
                            disable: true,
                            show: false
                        },

                        invoiceDetails: [],
                        startTime: {
                            value: null,
                            show: false
                        },
                        endTime: {
                            value: null,
                            show: false
                        },
                        timeStamp: null,
                        amount: null,
                        status: false,
                        editMode: false,
                        cancelGameBtn: {
                            disable: true,
                            show: false
                        },
                        timeFinish: false,
                        editStartTimePanel: {
                            disable: true, show: false
                        }
                    }, {
                        systemNumber: 7,
                        customer: {
                            name: null,
                            disable: false
                        },
                        members: {
                            count: 1,
                            disable: false
                        },
                        duration: {
                            hours: 1,
                            disable: false
                        },
                        startBtn: {
                            disable: true,
                            show: true
                        },
                        continueBtn: {
                            disable: true,
                            show: false
                        },
                        editBtn: {
                            disable: true,
                            show: false
                        },
                        stopBtn: {
                            disable: true,
                            show: false
                        },
                        cancelBtn: {
                            disable: true,
                            show: false
                        }, updateBtn: {
                            disable: true,
                            show: false
                        },

                        invoiceDetails: [],
                        startTime: {
                            value: null,
                            show: false
                        },
                        endTime: {
                            value: null,
                            show: false
                        },
                        timeStamp: null,
                        amount: null,
                        status: false,
                        editMode: false,
                        cancelGameBtn: {
                            disable: true,
                            show: false
                        },
                        timeFinish: false,
                        editStartTimePanel: {
                            disable: true, show: false
                        }
                    }, {
                        systemNumber: 8,
                        customer: {
                            name: null,
                            disable: false
                        },
                        members: {
                            count: 1,
                            disable: false
                        },
                        duration: {
                            hours: 1,
                            disable: false
                        },
                        startBtn: {
                            disable: true,
                            show: true
                        },
                        continueBtn: {
                            disable: true,
                            show: false
                        },
                        editBtn: {
                            disable: true,
                            show: false
                        },
                        stopBtn: {
                            disable: true,
                            show: false
                        },
                        cancelBtn: {
                            disable: true,
                            show: false
                        }, updateBtn: {
                            disable: true,
                            show: false
                        },

                        invoiceDetails: [],
                        startTime: {
                            value: null,
                            show: false
                        },
                        endTime: {
                            value: null,
                            show: false
                        },
                        timeStamp: null,
                        amount: null,
                        status: false,
                        editMode: false,
                        cancelGameBtn: {
                            disable: true,
                            show: false
                        },
                        timeFinish: false,
                        editStartTimePanel: {
                            disable: true, show: false
                        }
                    }, {
                        systemNumber: 9,
                        customer: {
                            name: null,
                            disable: false
                        },
                        members: {
                            count: 1,
                            disable: false
                        },
                        duration: {
                            hours: 1,
                            disable: false
                        },
                        startBtn: {
                            disable: true,
                            show: true
                        },
                        continueBtn: {
                            disable: true,
                            show: false
                        },
                        editBtn: {
                            disable: true,
                            show: false
                        },
                        stopBtn: {
                            disable: true,
                            show: false
                        },
                        cancelBtn: {
                            disable: true,
                            show: false
                        }, updateBtn: {
                            disable: true,
                            show: false
                        },

                        invoiceDetails: [],
                        startTime: {
                            value: null,
                            show: false
                        },
                        endTime: {
                            value: null,
                            show: false
                        },
                        timeStamp: null,
                        amount: null,
                        status: false,
                        editMode: false,
                        cancelGameBtn: {
                            disable: true,
                            show: false
                        },
                        timeFinish: false,
                        editStartTimePanel: {
                            disable: true, show: false
                        }
                    }, {
                        systemNumber: 10,
                        customer: {
                            name: null,
                            disable: false
                        },
                        members: {
                            count: 1,
                            disable: false
                        },
                        duration: {
                            hours: 1,
                            disable: false
                        },
                        startBtn: {
                            disable: true,
                            show: true
                        },
                        continueBtn: {
                            disable: true,
                            show: false
                        },
                        editBtn: {
                            disable: true,
                            show: false
                        },
                        stopBtn: {
                            disable: true,
                            show: false
                        },
                        cancelBtn: {
                            disable: true,
                            show: false
                        }, updateBtn: {
                            disable: true,
                            show: false
                        },

                        invoiceDetails: [],
                        startTime: {
                            value: null,
                            show: false
                        },
                        endTime: {
                            value: null,
                            show: false
                        },
                        timeStamp: null,
                        amount: null,
                        status: false,
                        editMode: false,
                        cancelGameBtn: {
                            disable: true,
                            show: false
                        },
                        timeFinish: false,
                        editStartTimePanel: {
                            disable: true, show: false
                        }
                    }]));

                    localStorage.setItem("sys1", JSON.stringify([{
                        systemNumber: 1,
                        customerName: null,
                        members: null,
                        duration: null,
                        invoiceDetails: [],
                        startTime: null,
                        endTime: null,
                        timeStamp: null,
                        duration: null,
                        amount: null,
                        status: false,
                        editMode: false
                    }, {
                        systemNumber: 2,
                        customerName: null,
                        members: null,
                        duration: null,
                        invoiceDetails: [],
                        startTime: null,
                        endTime: null,
                        timeStamp: null,
                        duration: null,
                        amount: null,
                        status: false,
                        editMode: false
                    }, {
                        systemNumber: 3,
                        customerName: null,
                        members: null,
                        duration: null,
                        invoiceDetails: [],
                        startTime: null,
                        endTime: null,
                        timeStamp: null,
                        duration: null,
                        amount: null,
                        status: false,
                        editMode: false
                    }, {
                        systemNumber: 4,
                        customerName: null,
                        members: null,
                        duration: null,
                        invoiceDetails: [],
                        startTime: null,
                        endTime: null,
                        timeStamp: null,
                        duration: null,
                        amount: null,
                        status: false,
                        editMode: false
                    }, {
                        systemNumber: 5,
                        customerName: null,
                        members: null,
                        duration: null,
                        invoiceDetails: [],
                        startTime: null,
                        endTime: null,
                        timeStamp: null,
                        duration: null,
                        amount: null,
                        status: false,
                        editMode: false
                    }, {
                        systemNumber: 6,
                        customerName: null,
                        members: null,
                        duration: null,
                        invoiceDetails: [],
                        startTime: null,
                        endTime: null,
                        timeStamp: null,
                        duration: null,
                        amount: null,
                        status: false,
                        editMode: false
                    }, {
                        systemNumber: 7,
                        customerName: null,
                        members: null,
                        duration: null,
                        invoiceDetails: [],
                        startTime: null,
                        endTime: null,
                        timeStamp: null,
                        duration: null,
                        amount: null,
                        status: false,
                        editMode: false
                    }, {
                        systemNumber: 8,
                        customerName: null,
                        members: null,
                        duration: null,
                        invoiceDetails: [],
                        startTime: null,
                        endTime: null,
                        timeStamp: null,
                        duration: null,
                        amount: null,
                        status: false,
                        editMode: false
                    }, {
                        systemNumber: 9,
                        customerName: null,
                        members: null,
                        duration: null,
                        invoiceDetails: [],
                        startTime: null,
                        endTime: null,
                        timeStamp: null,
                        duration: null,
                        amount: null,
                        status: false,
                        editMode: false
                    }]));
                }, 
                getCustomers: function(){
                    return JSON.parse(localStorage.getItem("customers"));
                },
                setCustomers: function(){
                    localStorage.setItem("customers", JSON.stringify([]));
                }
            }
        }
    ]);