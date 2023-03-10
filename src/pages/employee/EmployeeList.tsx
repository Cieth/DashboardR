import {
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRow,
  IonCol,
  IonCard,
  IonItem,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { add, close, pencil } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Employee from './Employee';
import { removeEmployee, searchEmployee } from './EmployeeApi';
import './EmployeeList.css';
const EmployeeList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [clients, setClients] = useState<Employee[]>([]);
  const history = useHistory();
  const search = async () => {
    const employees = await searchEmployee();
    setClients(employees);
  };
  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const remove = async (id: string) => {
    await removeEmployee(id);
    search();
  };

  const addEmployee = () => {
    history.push('/page/employees/new');
  };
  const editEmployee = (id: string) => {
    history.push('/page/employees/' + id);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name || 'Empleados'} </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonTitle>Gestión de Empleados </IonTitle>
          <IonItem>
            <IonButton
              onClick={addEmployee}
              color='primary'
              fill='solid'
              slot='end'
            >
              Agregar Empleado
              <IonIcon icon={add} />
            </IonButton>
          </IonItem>
          <IonGrid fixed={true} className='table'>
            <IonRow>
              <IonCol>Nombre</IonCol>
              <IonCol>Email</IonCol>
              <IonCol>Teléfono</IonCol>
              <IonCol>Dirección</IonCol>
              <IonCol>Salario</IonCol>
              <IonCol>Acciones</IonCol>
            </IonRow>
            {clients.map((client: Employee) => {
              return (
                <IonRow key={client.id}>
                  <IonCol>{client.firstname + ' ' + client.lastname}</IonCol>
                  <IonCol>{client.email}</IonCol>
                  <IonCol>{client.phone}</IonCol>
                  <IonCol>{client.address}</IonCol>
                  <IonCol>{client.salary}</IonCol>
                  <IonCol>
                    <IonButton
                      onClick={() => editEmployee(String(client.id))}
                      color='primary'
                      fill='clear'
                      size='small'
                    >
                      <IonIcon icon={pencil} slot='icon-only' />
                    </IonButton>
                    <IonButton
                      onClick={() => remove(String(client.id))}
                      color='danger'
                      fill='clear'
                      size='small'
                    >
                      <IonIcon icon={close} slot='icon-only' />
                    </IonButton>
                  </IonCol>
                </IonRow>
              );
            })}
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default EmployeeList;
