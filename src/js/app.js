export class App {

    configureRouter(config, router) {
        config.title = 'test title';
        config.map([
            {route: '', name: 'Home', moduleId: 'js/home/home', nav: true, title: 'Hello'}
        ]);

        this.router = router;
    }
}