<template>
    <div>
        <v-container class="my-12">
            <!-- Entire faq card start-->
            <v-card color="transparent">
                <!-- header of faq card-->
                <v-toolbar
                        flat
                        color="transparent"
                        dark
                >
                    <div class="text-sm-h4 text-h6">FAQ</div>
                </v-toolbar>

                <!-- tab for each category of faq-->
                <!-- tab will be vertical until xs breakpoint-->
                <v-tabs :vertical="!$vuetify.breakpoint.xs"
                        active-class="yellow--text"
                        slider-color="yellow"
                        background-color="transparent"
                        dark
                        class="cTab">
                    <!--list of all category in view of tabs-->
                    <v-tab v-for="(item,idx) in categories" :key="idx">
                        {{item.name}}
                    </v-tab>

                    <!-- for each category tab item. tab will active depend on key-->
                    <v-tab-item v-for="(item,idx) in categories" :key="idx">
                        <v-card min-height="300px" color="transparent">
                            <v-card-text class="pa-1">
                                <v-expansion-panels accordion dark>
                                    <!-- in each category all question answer using expand (come from data) -->
                                    <v-expansion-panel
                                            v-for="(item,i) in item.faq"
                                            :key="i"
                                    >
                                        <!--question part-->
                                        <v-expansion-panel-header class="subtitle-1 font-weight-bold">
                                            {{item.question}}
                                        </v-expansion-panel-header>
                                        <!--answer part-->
                                        <v-expansion-panel-content class="subtitle-2">
                                            <div v-text="item.answer"></div>
                                        </v-expansion-panel-content>
                                    </v-expansion-panel>
                                </v-expansion-panels>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    export default {
        data: () => ({
            // this is the faq content for each category question and answer.
            // Splits up the inquiries into sub sections per topic for user simplification
            categories: [
                {
                    name: 'General',
                    faq: [
                        {
                            question: 'Is my information being sold/used externally?',
                            answer: 'The web application does not export any user data to external sources and only uses it in to improve \n' +
                                    'user experience to achieve targeted outcomes such as helping users find entertainment together.\n' +
                                    'If the data is ever to be used for other purposes it will first notify users and request permissions first.'
                        },
                        {
                            question: 'How are the entertainment options arranged?',
                            answer: 'Currently the options are presented in both TV shows and movies by popularity of each title curently. The Movie Database \n'+
                                    'is used to do so and regularly has automatic updates depending on current popularity and trends for options.'
                        },
                        {
                            question: 'Will I lose my current recommended if another is matched?', 
                            answer: 'Recommendation tab currently can hold an infinite number of matches currently so please feel free \n'+
                                    'to like or dislike as you please without any concerns of losing your options.'
                        },
                        {
                            question: 'There is only an Introduction and Register/Log In page available?', 
                            answer: 'To help ensure a smooth and functional service, users who are not signed in will not be granted access to other tabs.'
                        },
                        {
                            question: 'Is the our final launch product?',
                            answer: 'This is an early version of our launch product still in early access to get feedback and improve accordingly in all departments.'
                        },
                        {
                            question: 'For any other issues that require assistance:',
                            answer: 'Please use any of the social media links at the introduction page or email: mqure002@gold.ac.uk to contact us to resolve it.'
                        },
                    ]
                },
                {
                    name: 'Shortcuts',
                    faq: [
                        {
                            question: 'Are there apps on stores for IOS, Android or Windows store?',
                            answer: 'Unfortunately, due to a small team and it being early in development there are no personalized apps on any operating system.\n' +
                                    'There are however plans to develop and release applications on each platform simultaneously to prevent any users\n' +
                                    'being unable to use the service with partners on other systems which is why it was released as a web application first. \n' +
                                    'Currently the following shortcuts underneath are the best methods to simplify usage for our service on smart phones.'
                        },
                        {
                            question: 'IOS shortcut set up',
                            answer: 'Open Safari and head to a website you want to pin to the Home Screen --> Then tap the Share icon at the bottom.\r'+ 
                                    '-- > Then tap Add to Home Screen from the menu and enter a name. --> Click add on top right to finish.'
                        },
                        {
                            question: 'Android shortcut set up',
                            answer: 'Launch “Chrome” app --> Open the website or web page you want to pin to your home screen --> \r' +
                            'Tap the menu icon (3 dots in upper right-hand corner) and tap Add to home screen --> You’ll be able to \r' +
                            'enter a name for the shortcut and then Chrome will add it to your home screen.'
                        },

                    ]
                },
                {
                    name: 'Updates',
                    faq: [
                        {
                            question: 'Are there other features and improvements coming?',
                            answer: 'Yes, the web application is being done by a very small team currently and is still early in its launch with numerous plans.\n' +
                                    'A range of updates are still being worked on and developed such as minor upgrades that allow multiple users grouping\n' +
                                    'and filters in entertainment options per streaming service. Major updates are also scheduled to be implemented regarding\n' +
                                    'recommendation algorithms for users along with personalized applications for each operating system such as IOS and\n' +
                                    'android apps coming at a later date.'
                        },
                        {
                            question: 'Contact regarding suggestions and feedback?',
                            answer: 'Contacting us on any of the social media pages linked at the landing page is the best method, any feedback and suggestions\n' +
                                    'is greatly appreciated. In the event user has no social media applications any inquiries and feedback can be emailed to the \n' +
                                    'following email: mqure002@gold.ac.uk'
                        },

                    ]
                }
            ],
        })
    };
</script>
/* calls stylesheet to be used in formatting text and page */
<style lang="scss">
    .cTab {
        .v-tabs-items, .v-expansion-panel {
            background: transparent !important;
        }
    }
</style>