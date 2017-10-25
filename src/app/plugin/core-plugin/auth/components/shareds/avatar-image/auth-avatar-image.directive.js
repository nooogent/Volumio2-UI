class AuthAvatarImageDirective {
  constructor() {
    'ngInject';
    let directive = {
      restrict: 'E',
      templateUrl: 'app/plugin/core-plugin/auth/components/shareds/avatar-image/auth-avatar-image.html',
      controller: AuthAvatarImage,
      controllerAs: 'authAvatarImageController',
      scope:{
        imageOverride: '<'
      }
    };
    return directive;
  }
}

class AuthAvatarImage {
  constructor($rootScope, $scope, $state, authService, modalService) {
    'ngInject';
    this.$scope = $scope;
    this.$state = $state;
    this.authService = authService;
    this.$watch = $scope.$watch;

    this.user = null;
    
    this.imageUrl = null;
    this.modalService = modalService;

    this.init();
  }
  
  init(){
    this.authInit();
    this.watchImageOverride();
  }

  authInit() {
    this.$scope.$watch(() => this.authService.user,(user) => {
      this.user = user;
      this.postAuthInit();
    });
  }
  
  postAuthInit(){
    this.loadImage();
  }
  
  watchImageOverride(){
    this.$scope.$watch(() => this.$scope.imageOverride,(image) => {
      if(image){
        this.imageUrl = image;
      }
    })
  }

  loadImage(){
    if(!this.user || this.user.photoUrl === null || this.user.photoUrl === undefined){
      this.imageUrl = null;
      return;
    }
    this.imageUrl = this.user.photoUrl;
  }

}

export default AuthAvatarImageDirective;
