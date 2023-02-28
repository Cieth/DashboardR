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
import Customer from './Customer';

import { removeCustomer, searchCustomer } from './CustomerApi';
import './CustomerList.css';
const CustomerList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [clients, setClients] = useState<Customer[]>([]);
  const history = useHistory();
  const search = () => {
    const customers = searchCustomer();
    setClients(customers);
  };
  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const remove = (id: string) => {
    removeCustomer(id);
    search();
  };

  const addCustomer = () => {
    history.push('/page/customers/new');
  };
  const editCustomer = (id: string) => {
    history.push('/page/customers/' + id);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name || 'Clientes'} </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonTitle>Gestión de clientes </IonTitle>
          <IonItem>
            <IonButton
              onClick={addCustomer}
              color='primary'
              fill='solid'
              slot='end'
            >
              Agregar Cliente
              <IonIcon icon={add} />
            </IonButton>
          </IonItem>
          <IonGrid fixed={true} className='table'>
            <IonRow>
              <IonCol>Nombre</IonCol>
              <IonCol>Email</IonCol>
              <IonCol>Teléfono</IonCol>
              <IonCol>Dirección</IonCol>
              <IonCol>Acciones</IonCol>
            </IonRow>
            {clients.map((client: Customer) => {
              return (
                <IonRow key={client.id}>
                  <IonCol>{client.firstName + ' ' + client.lastName}</IonCol>
                  <IonCol>{client.email}</IonCol>
                  <IonCol>{client.phone}</IonCol>
                  <IonCol>{client.address}</IonCol>
                  <IonCol>
                    <IonButton
                      onClick={() => editCustomer(String(client.id))}
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

export default CustomerList;
