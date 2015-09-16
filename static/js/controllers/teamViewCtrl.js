var TEAM_COLUMN_LABELS = ['Feature','Commitment', 'Commit Status','Def. of Done','Start Iteration','Finish Iteration','Comments'];

saturnApp.controller("teamViewCtrl",['$scope','$http', '$resource', '$modal', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'Team', 'Commitment',
	function($scope, $http, $resource, $modal, DTOptionsBuilder, DTColumnDefBuilder, Team, Commitment) {
		$scope.teamId = $('#teamId').html();
		$scope.columns = TEAM_COLUMN_LABELS;

		$scope.teamObj = Team.get({id: $scope.teamId}), function() {
			console.log($scope.teamObj);
		};

		$scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');

    	$scope.dtColumnDefs = [
			DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3),
			DTColumnDefBuilder.newColumnDef(4),
			DTColumnDefBuilder.newColumnDef(5),
			DTColumnDefBuilder.newColumnDef(6),
			DTColumnDefBuilder.newColumnDef(7).notSortable(),
			DTColumnDefBuilder.newColumnDef(8).notSortable(),
			DTColumnDefBuilder.newColumnDef(9).notSortable(),
			DTColumnDefBuilder.newColumnDef(10).notSortable(),
		];

		$scope.showRisks = function(commitment) {
			var modalInstance = $modal.open({
				animation: true,
				templateUrl: '/static/js/templates/showRisks.html',
				controller: 'RiskCtrl',
				size: 'lg',
				resolve: {
		        	commitment: function () {
						return commitment;
		        	}
				}
		    });
		};

		$scope.showDependencies = function(commitment) {
			var modalInstance = $modal.open({
				animation: true,
				templateUrl: '/static/js/templates/editCommitment.html',
				controller: 'DependencyCtrl',
				size: 'lg',
				resolve: {
		        	commitment: function () {
						return commitment;
		        	}
				}
		    });
		}

		$scope.editCommitment = function(size, commitment) {
			var modalInstance = $modal.open({
				animation: true,
				templateUrl: '/static/js/templates/editCommitment.html',
				controller: 'EditCommitmentCtrl',
				size: size,
				resolve: {
		        	commitment: function () {
						return commitment;
		        	}
				}
		    });
		};

		$scope.showConfirmationPrompt = function(size, id) {
			var modalInstance = $modal.open({
				animation: true,
				templateUrl: '/static/js/templates/deleteConfirmation.html',
				controller: 'DeleteCommitmentCtrl',
				size: size,
				resolve: {
					id: function () {
						return id;
					}
				}
		    });
		};

}]);

saturnApp.controller('DeleteCommitmentCtrl', function($scope, $modalInstance, $modal, id, Commitment) {
	$scope.commitment_id = id;
	$scope.confirmationText = 'Are you sure you want to delete this commitment? ' +
	'Deleting this commitment will also delete any associated risks and dependencies.';

	$scope.delete = function() {
		Commitment.delete({id: $scope.commitment_id}, function() {
			console.log("Commitment deleted.");
		});

		$modalInstance.close();
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});

saturnApp.controller('EditCommitmentCtrl', function($scope, $modalInstance, commitment, Commitment) {
	$scope.commitment = commitment;
	$scope.iterationOptions = PSI_CYCLES;
	$scope.commitmentStatusOptions = COMMITMENT_STATUS_OPTIONS;
	$scope.defOfDoneOptions = DEFINITION_OF_DONE_OPTIONS;

	$scope.updateCommitment = function() {
		Commitment.update({id: $scope.commitment.id}, $scope.commitment, function() {
			console.log("Updated");
		});

	  $modalInstance.close();
	};

	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
	};
});
