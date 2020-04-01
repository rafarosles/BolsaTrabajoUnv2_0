﻿/// <reference path="../Models/BtuModel.js"/>
/// <reference path="../global.js"/>
(function () {
    var app = angular.module('BtuWeb', []);
    app.controller('BtuController', ['$scope', function ($scope) {

        var self = this;
        let existeEmpresa = "";        
        let listEstados = "";
        let listMunicipios = "";
        let listTipoPersona = "";
        let listMedioContacto = "";
        let listCarreras = "";
        let listGradoEstudios = "";
        let listAreaConocimiento = "";
        let listNivelSoftware = "";
        let listNivelIdioma = "";
        let listTipoCurso = "";
        let listSesionUnach = "";
        let listDatosRegistroUnach = "";
        let listEstAcadGuardados = "";
        let listSoftware = "";
        let listIdioma = "";
        let datosPersonales = false;

        //Funciones Vista Registrar Empresas

        this.GlobalInfoPer = () => {

            if (self.RazonSocial !== undefined && self.NombreComercial !== undefined && self.TipoPersona !== undefined && self.Actividad !== undefined && self.CodigoPost !== undefined &&
                self.Estado !== undefined && self.Municipio !== undefined && self.Colonia !== undefined && self.Domicilio != undefined &&
                self.RazonSocial !== '' && self.NombreComercial !== '' && self.TipoPersona !== '' && self.Actividad !== '' && self.CodigoPost !== '' &&
                self.Estado !== '' && self.Municipio !== '' && self.Colonia !== '' && self.Domicilio !== '') {
                $("#infemp1").show();
                $("#infemp2").hide();
                $("#globalInfoemp").css('background-color', 'green');
            }
            else {
                $("#infemp1").hide();
                $("#infemp2").show();
                $("#globalInfoemp").css('background-color', 'yellow');
            }
        };

        this.GlobalDatosContacto = () => {            
            if (self.PersonaContacto !== undefined && self.Cargo !== undefined && self.TelOficina !== undefined && self.Celular !== undefined && self.Email !== undefined && self.MedioContacto !== undefined &&
                self.PersonaContacto !== '' && self.Cargo !== '' && self.TelOficina !== '' && self.Celular !== '' && self.Email !== '' && self.MedioContacto !== '') {
                $("#datcont1").show();
                $("#datcont2").hide();
                $("#globalDatosCont").css('background-color', 'green');
            }
            else {
                $("#datcont1").hide();
                $("#datcont2").show();
                $("#globalDatosCont").css('background-color', 'yellow');
            }
        };

        this.GlobalDatosSesion = () => {
            if (self.Usuario !== undefined && self.Contrasena !== undefined && self.Contrasena2 !== undefined &&
                self.Usuario !== '' && self.Contrasena !== '' && self.Contrasena2 !== '') {
                $("#datossesion1").show();
                $("#datossesion2").hide();
                $("#globalSesion").css('background-color', 'green');
            }
            else {
                $("#datossesion1").hide();
                $("#datossesion2").show();
                $("#globalSesion").css('background-color', 'yellow');
            }
        };

        this.BuscarEmpresa = () => {    
            btuContext.BuscarEmpresa(self.RfcBuscarEmpresa, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        existeEmpresa = btuContext.listDatosExistEmpr[0].Existe;
                        if (existeEmpresa !== "2") {
                            self.RazonSocial = "";
                            self.NombreComercial = "";
                            self.Actividad = "";
                            self.CodigoPost = "";
                            self.Estado = "";
                            self.Municipio = "";
                            self.Colonia = "";
                            self.Domicilio = "";
                            self.PersonaContacto = "";
                            self.Cargo = "";
                            self.TelOficina = "";
                            self.Celular = "";
                            self.Email = "";
                            self.MedioContacto = "";
                            self.Contrasena = "";
                            self.TipoPersona = "";
                            self.Usuario = self.RfcBuscarEmpresa;
                            $('#buscarRfc').show();                            
                            $("#globalInfoemp").css('background-color', 'yellow');
                            $("#globalDatosCont").css('background-color', 'yellow');
                            $("#globalSesion").css('background-color', 'yellow');
                            $("#formularioRegistro").show();
                            $("#usuarioEmpresa").prop("disabled", true);
                            alert("La empresa no existe, complete el siguiente formulario para registrarla");
                        }
                        else
                            alert("La empresa ya ha sido registrada, comuniquese con el personal de BTU para más detalles");
                        break;
                    case "notgp":
                        alert(resp.message);
                        break;
                    default:
                        break;
                }
                $scope.$apply();
                ComboEstados();
                TipoPersona();
                ComboMedioContacto();
            });
            //$('#buscandoEmpresa').show();
            //if (self.RfcBuscarEmpresa !== "" && self.RfcBuscarEmpresa !== undefined) {
                
            //}
            //else {
            //    alert("Introduzca un RFC");
            //    //$('#buscandoEmpresa').modal("hide");
            //    $('#buscandoEmpresa').hide();
            //}
        };

        this.RegistrarDatosEmpresa = () => {
            if (self.Contrasena2 === self.Contrasena) {
                btuContext.RegistrarDatosEmpresa(self.RazonSocial, self.NombreComercial, self.Actividad, self.CodigoPost, self.Estado, self.Municipio, self.Colonia, self.Domicilio, self.Usuario,
                    self.PersonaContacto, self.Cargo, self.TelOficina, self.Celular, self.Email, self.MedioContacto, self.Contrasena, self.TipoPersona, function (resp) {
                        switch (resp.ressult) {
                            case "tgp":
                                alert("Los datos se han guardado correctamente");
                                break;
                            case "notgp":
                                alert(resp.message);
                                break;
                            default:
                                break;
                        }
                        $scope.$apply();
                    });
            }
            else
                alert("Las contraseñas no coinciden");
        };

        var TipoPersona = () => {
            btuContext.ComboTipoPersona(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.listTipoPersona = btuContext.listTipoPersona;
                        break;
                    case "notgp":
                        alert(resp.message);
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        }; 
        
        var ComboMedioContacto = () => {
            btuContext.ComboMedioContacto(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.listMedioContacto = btuContext.listMedioContacto;
                        break;
                    case "notgp":
                        alert(resp.message);
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };

        //Funciones Vista DatosCandidatos

        this.GlobalInfoPersonal = () => {            
            if (self.Matricula !== undefined && self.NombreCandidato !== undefined && self.ApePatCandidato !== undefined && self.ApeMatCandidato !== undefined
                && self.FecNac !== undefined && self.Estado !== undefined && self.Municipio !== undefined && self.Domicilio !== undefined && self.TelCel !== undefined
                && self.TelAd !== undefined && self.Email !== undefined && self.AreaInt !== undefined && self.ObjPersonal !== undefined
                && self.Matricula !== "" && self.NombreCandidato !== "" && self.ApePatCandidato !== "" && self.ApeMatCandidato !== "" && self.FecNac !== ""
                && self.Estado !== "" && self.Municipio !== "" && self.Domicilio !== "" && self.TelCel !== "" && self.TelAd !== "" && self.Email !== ""
                && self.AreaInt !== "" && self.ObjPersonal !== "") {
                $("#infper1").show();
                $("#infper2").hide();
                $("#globalInfoPer").css('background-color', 'green');                
            }
            else {
                $("#infper1").hide();
                $("#infper2").show();                
                $("#globalInfoPer").css('background-color', 'yellow');
            }
        };

        this.GlobalInfoAcademica = () => {
            if (self.listEstAcadGuardados.length !== 0) {
                $("#estuacad1").show();
                $("#estuacad2").hide();
                $("#globalEstuAcd").css('background-color', 'green');
            }
            else {
                if (self.GradoEst !== undefined && self.NombEsc !== undefined && self.Carrera !== undefined && self.AreaConoc !== undefined && self.FechaIniCarrera !== undefined && self.FechaFinCarrera !== undefined &&
                    self.GradoEst !== '' && self.NombEsc !== '' && self.Carrera !== '' && self.AreaConoc !== '' && self.FechaIniCarrera !== '' && self.FechaFinCarrera !== '') {
                    $("#estuacad1").show();
                    $("#estuacad2").hide();
                    $("#globalEstuAcd").css('background-color', 'green');
                }
                else {
                    $("#estuacad1").hide();
                    $("#estuacad2").show();
                    $("#globalEstuAcd").css('background-color', 'yellow');
                }
            }            
        };

        this.GlobalExpProf = () => {
            if (self.NombreEmpresa !== undefined && self.FechaIniExpProf !== undefined && self.FechaFinExpProf !== undefined && self.DescAct !== undefined && self.ReferenciaTrabajo !== undefined && 
                self.NombreEmpresa !== '' && self.FechaIniExpProf !== '' && self.FechaFinExpProf !== '' && self.DescAct !== '' && self.ReferenciaTrabajo !== '') {                
                $("#expprof1").show();
                $("#expprof2").hide();
                $("#globalExpProf").css('background-color', 'green');
            }
            else {
                $("#expprof1").hide();
                $("#expprof2").show();
                $("#globalExpProf").css('background-color', 'yellow');
            }
        };

        this.CargarDatosPrincipales = () => {
            ComboEstados();
            ComboGradoEstudios();
            ComboCarreras();
            ComboAreaConocimiento();
            ComboNivelSoftware();
            ComboNivelIdioma();
            ComboTipoCurso();
            btuContext.DatosRegistroUnach( function (resp) {
                    switch (resp.ressult) {
                        case "tgp":
                            self.listDatosRegistroUnach = btuContext.listDatosRegistroUnach;
                            self.DescCarrera = self.listDatosRegistroUnach[0].Carrera;
                            self.Matricula = self.listDatosRegistroUnach[0].Matricula;
                            self.NombreCandidato = self.listDatosRegistroUnach[0].Nombre;
                            self.ApePatCandidato = self.listDatosRegistroUnach[0].Paterno;
                            self.ApeMatCandidato = self.listDatosRegistroUnach[0].Materno;
                            $("#FecNac").val(self.listDatosRegistroUnach[0].FechaNacimiento); 
                            //self.Estado = self.listDatosRegistroUnach[0].Estado;
                            //self.Municipio = self.listDatosRegistroUnach[0].Municipio;                            
                            self.Domicilio = self.listDatosRegistroUnach[0].Domicilio;
                            self.TelCel = self.listDatosRegistroUnach[0].Celular;
                            self.TelAd = self.listDatosRegistroUnach[0].Telefono;
                            self.Email = self.listDatosRegistroUnach[0].Correo;       
                            self.Carrera = self.listDatosRegistroUnach[0].IdCarrera
                            break;
                        case "notgp":
                            alert(resp.message);
                            break;
                        default:
                            break;
                    }
                    $scope.$apply();
                });
        };

        this.GuardarInformacionCandidato = () => {
            btuContext.GuardarInformacionCandidato(self.Matricula, self.NombreCandidato, self.ApePatCandidato, self.ApeMatCandidato, self.FecNac, self.Estado,
                self.Municipio, self.Domicilio, self.TelCel, self.TelAd, self.Email, self.AreaInt, self.ObjPersonal, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        datosPersonales = true;
                        break;
                    case "notgp":
                        alert(resp.message);
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };

        this.GuardarEstudiosAcademicos = () => {
            let Carrera = $("#Carrera option:selected").text();
            let FechaInicio = $("#FechaIniCarrera").val();
            let FechaFin = $("#FechaFinCarrera").val();
            let DescGradoEstu = $("#GradoEst option:selected").text();

            btuContext.GuardarEstudiosAcademicos(self.GradoEst, self.NombEsc, self.Carrera, self.AreaConoc, FechaInicio, FechaFin, Carrera, DescGradoEstu, function (resp) {
                    switch (resp.ressult) {
                        case "tgp":
                            self.listEstAcadGuardados = btuContext.listEstAcadGuardados;
                            self.GradoEst = "";
                            self.NombEsc = "";
                            self.Carrera = "";
                            self.AreaConoc = "";
                            self.FechaIniCarrera = "";
                            self.FechaFinCarrera = "";
                            break;
                        case "notgp":
                            alert(resp.message);
                            break;
                        default:
                            break;
                    }
                    $scope.$apply();
                });
        };

        this.GuardarSoftware = () => {
            btuContext.GuardarSoftware(self.Software, self.NivelSoftware, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.listSoftware = btuContext.listSoftware;
                        self.Software = "";
                        self.NivelSoftware = "";
                        break;
                    case "notgp":
                        alert(resp.message);
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };

        this.GuardarIdioma = () => {
            btuContext.GuardarIdioma(self.Idioma, self.NivelIdioma, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.listIdioma = btuContext.listIdioma;
                        self.Idioma = "";
                        self.NivelIdioma = "";
                        break;
                    case "notgp":
                        alert(resp.message);
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };

        this.GuardarExperienciaProfesional = () => {

        };

        this.EliminarEstudioAcademico = (Posicion) => {
            let eliminar = confirm('¿Desea eliminar el elemento de la lista?')
            if (eliminar) {
                btuContext.EliminarEstudioAcademico(Posicion, function (resp) {
                    switch (resp.ressult) {
                        case "tgp":
                            self.listEstAcadGuardados = btuContext.listEstAcadGuardados;
                            break;
                        case "notgp":
                            alert(resp.message);
                            break;
                        default:
                            break;
                    }
                    $scope.$apply();
                });
            }
        };

        this.EliminarSoftware = (Posicion) => {
            let eliminar = confirm('¿Desea eliminar el elemento de la lista?')
            if (eliminar) {
                btuContext.EliminarSoftware(Posicion, function (resp) {
                    switch (resp.ressult) {
                        case "tgp":
                            self.listSoftware = btuContext.listSoftware;
                            break;
                        case "notgp":
                            alert(resp.message);
                            break;
                        default:
                            break;
                    }
                    $scope.$apply();
                });
            }
        };

        this.EliminarIdioma = (Posicion) => {
            let eliminar = confirm('¿Desea eliminar el elemento de la lista?')
            if (eliminar) {
                btuContext.EliminarIdioma(Posicion, function (resp) {
                    switch (resp.ressult) {
                        case "tgp":
                            self.listIdioma = btuContext.listIdioma;
                            break;
                        case "notgp":
                            alert(resp.message);
                            break;
                        default:
                            break;
                    }
                    $scope.$apply();
                });
            }
        };

               
        //Funciones para cargar combos compartidos
        var ComboEstados = () => {
            btuContext.ComboEstados(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.listEstados = btuContext.listEstados;
                        break;
                    case "notgp":
                        alert(resp.message);
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };

        this.ComboMunicipios = () => {
            btuContext.ComboMunicipios(self.Estado, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.listMunicipios = btuContext.listMunicipios;
                        break;
                    case "notgp":
                        alert(resp.message);
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };

        var ComboGradoEstudios = () => {
            btuContext.ComboGradoEstudios(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.listGradoEstudios = btuContext.listGradoEstudios;
                        break;
                    case "notgp":
                        alert(resp.message);
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };

        var ComboCarreras = () => {
            btuContext.ComboCarreras( function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.listCarreras = btuContext.listCarreras;
                        break;
                    case "notgp":
                        alert(resp.message);
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };

        var ComboAreaConocimiento = () => {
            btuContext.ComboAreaConocimiento(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.listAreaConocimiento = btuContext.listAreaConocimiento;
                        break;
                    case "notgp":
                        alert(resp.message);
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };

        var ComboNivelSoftware = () => {
            btuContext.ComboNivelSoftware("SOFTWARE", function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.listNivelSoftware = btuContext.listNvlSoft;
                        break;
                    case "notgp":
                        alert(resp.message);
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };

        var ComboNivelIdioma = () => {
            btuContext.ComboNivelIdioma("IDIOMA", function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.listNivelIdioma = btuContext.listNvlIdi;
                        break;
                    case "notgp":
                        alert(resp.message);
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };

        var ComboTipoCurso = () => {
            btuContext.ComboTipoCurso(function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.listTipoCurso = btuContext.listTipoCurso;
                        break;
                    case "notgp":
                        alert(resp.message);
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };

        //Funciones para la vista Btu

        this.IniciarSesion = (Tipo) =>{
            btuContext.IniciarSesion(self.UsuarioUnach, self.ContrasenaUnach, Tipo, function (resp) {
                switch (resp.ressult) {
                    case "tgp":
                        self.listSesionUnach = btuContext.listSesionUnach;
                        if (self.listSesionUnach[0].Existe === "1" && self.listSesionUnach[0].Registrado === "0")
                            window.location.assign(urlServer + "Btu/DatosCandidato");
                        //self.listSesionUnach[0].Existe !== "1"                            
                        break;
                    case "notgp":
                        alert(resp.message);
                        break;
                    default:
                        break;
                }
                $scope.$apply();
            });
        };


    }]);
})();